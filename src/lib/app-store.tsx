import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  customers as seedCustomers,
  defaultStores,
  jobs as seedJobs,
  notifications as seedNotifications,
  parts as seedParts,
  technicians as seedTechnicians,
} from './mock-data';
import type { Customer, Job, JobStatus, Part, StoreLocation, Technician } from './types';

type StoreContextType = {
  jobs: Job[];
  customers: Customer[];
  technicians: Technician[];
  parts: Part[];
  notifications: typeof seedNotifications;
  currentStore: string;
  stores: StoreLocation[];
  setCurrentStore: (storeName: string) => void;
  setStores: React.Dispatch<React.SetStateAction<StoreLocation[]>>;
  addJob: (job: Job) => void;
  updateJob: (id: string, patch: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  addCustomer: (c: Customer) => void;
  addTechnician: (t: Technician) => void;
  addPart: (p: Part) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
};

const Context = createContext<StoreContextType | undefined>(undefined);

export function AppStore({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(seedJobs);
  const [customers, setCustomers] = useState<Customer[]>(seedCustomers);
  const [technicians, setTechnicians] = useState<Technician[]>(seedTechnicians);
  const [parts, setParts] = useState<Part[]>(seedParts);
  const [notifications, setNotifications] = useState(seedNotifications);
  const [currentStore, setCurrentStore] = useState<string>('ABC Mobile Store');
  const [stores, setStores] = useState<StoreLocation[]>(defaultStores);

  const value = useMemo(
    () => ({
      jobs,
      customers,
      technicians,
      parts,
      notifications,
      currentStore,
      stores,
      setCurrentStore,
      setStores,
      addJob: (job: Job) => setJobs((v) => [job, ...v]),
      updateJob: (id: string, patch: Partial<Job>) =>
        setJobs((v) => v.map((j) => (j.id === id ? { ...j, ...patch } : j))),
      deleteJob: (id: string) => setJobs((v) => v.filter((j) => j.id !== id)),
      addCustomer: (c: Customer) => setCustomers((v) => [c, ...v]),
      addTechnician: (t: Technician) => setTechnicians((v) => [t, ...v]),
      addPart: (p: Part) => setParts((v) => [p, ...v]),
      markRead: (id: string) =>
        setNotifications((v) => v.map((n) => (n.id === id ? { ...n, read: true } : n))),
      markAllRead: () => setNotifications((v) => v.map((n) => ({ ...n, read: true }))),
    }),
    [jobs, customers, technicians, parts, notifications, currentStore, stores],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAppStore() {
  const value = useContext(Context);
  if (!value) throw new Error('AppStore missing');
  return value;
}

export const statusOptions: JobStatus[] = [
  'Received',
  'Diagnosis',
  'Estimate',
  'Waiting Approval',
  'Waiting Parts',
  'Repairing',
  'Quality Check',
  'Ready for Collection',
  'Delivered',
  'Cancelled',
];
