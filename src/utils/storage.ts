export const getStorage = (key: string, defaultValue: any) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  value: number;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  completed: boolean;
}
