import { create } from 'zustand';

// Import generated images
import project1 from '@assets/generated_images/modern_architectural_building_glass_facade.png';
import project2 from '@assets/generated_images/sleek_mobile_app_interface_design.png';
import project3 from '@assets/generated_images/eco-friendly_branding_packaging_design.png';
import client1 from '@assets/generated_images/professional_headshot_woman_business_suit.png';
import client2 from '@assets/generated_images/professional_headshot_man_casual_business.png';
import client3 from '@assets/generated_images/professional_headshot_creative_woman.png';

// Types
export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  imageUrl: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  timestamp: Date;
}

export interface Subscriber {
  id: string;
  email: string;
  timestamp: Date;
}

// Mock Data
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Mumbai Corporate Tower',
    description: 'A modern architectural marvel featuring sustainable glass facades and eco-friendly materials in the heart of Mumbai\'s financial district.',
    imageUrl: project1,
  },
  {
    id: '2',
    name: 'Bangalore FinTech App',
    description: 'A sleek and intuitive mobile banking application designed for tech-savvy users across India.',
    imageUrl: project2,
  },
  {
    id: '3',
    name: 'Delhi EcoPack Initiative',
    description: 'Revolutionary biodegradable packaging design for a leading organic food brand operating across North India.',
    imageUrl: project3,
  },
];

const INITIAL_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    designation: 'CEO, TechFlow India',
    description: 'Working with this team was a game-changer. They understood our vision perfectly and delivered beyond expectations for our Mumbai operations.',
    imageUrl: client1,
  },
  {
    id: '2',
    name: 'Rajesh Patel',
    designation: 'Founder, GreenEarth Solutions',
    description: 'The creativity and attention to detail shown in our rebranding project were outstanding. Highly recommended for companies across India!',
    imageUrl: client2,
  },
  {
    id: '3',
    name: 'Anya Desai',
    designation: 'Marketing Director, StyleHub Bangalore',
    description: 'A professional team that delivers results. Our new campaign assets have significantly boosted engagement in the Indian market.',
    imageUrl: client3,
  },
];

const INITIAL_CONTACTS: ContactSubmission[] = [
  {
    id: '1',
    fullName: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    mobile: '+91 98765 43210',
    city: 'Mumbai',
    timestamp: new Date('2023-10-15'),
  },
  {
    id: '2',
    fullName: 'Sneha Gupta',
    email: 'sneha.gupta@example.com',
    mobile: '+91 99876 54321',
    city: 'Bangalore',
    timestamp: new Date('2023-10-16'),
  },
];

const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: '1', email: 'newsletter@delhi.in', timestamp: new Date('2023-09-01') },
  { id: '2', email: 'updates@hyderabad.tech', timestamp: new Date('2023-09-05') },
];

interface StoreState {
  projects: Project[];
  clients: Client[];
  contacts: ContactSubmission[];
  subscribers: Subscriber[];
  
  addProject: (project: Omit<Project, 'id'>) => void;
  addClient: (client: Omit<Client, 'id'>) => void;
  addContact: (contact: Omit<ContactSubmission, 'id' | 'timestamp'>) => void;
  addSubscriber: (email: string) => void;
  updateProjectImage: (index: number, url: string) => void;
  updateClientImage: (index: number, url: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  projects: INITIAL_PROJECTS,
  clients: INITIAL_CLIENTS,
  contacts: INITIAL_CONTACTS,
  subscribers: INITIAL_SUBSCRIBERS,

  addProject: (project) => set((state) => ({
    projects: [...state.projects, { ...project, id: Math.random().toString(36).substr(2, 9) }]
  })),

  addClient: (client) => set((state) => ({
    clients: [...state.clients, { ...client, id: Math.random().toString(36).substr(2, 9) }]
  })),

  addContact: (contact) => set((state) => ({
    contacts: [...state.contacts, { ...contact, id: Math.random().toString(36).substr(2, 9), timestamp: new Date() }]
  })),

  addSubscriber: (email) => set((state) => ({
    subscribers: [...state.subscribers, { id: Math.random().toString(36).substr(2, 9), email, timestamp: new Date() }]
  })),

  updateProjectImage: (index, url) => set((state) => {
    const newProjects = [...state.projects];
    if (newProjects[index]) {
      newProjects[index].imageUrl = url;
    }
    return { projects: newProjects };
  }),

  updateClientImage: (index, url) => set((state) => {
    const newClients = [...state.clients];
    if (newClients[index]) {
      newClients[index].imageUrl = url;
    }
    return { clients: newClients };
  }),
}));
