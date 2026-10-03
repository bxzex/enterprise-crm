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
  createdAt: string;
}

const daysAgo = (days: number, hour = 10) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, 15, 0, 0);
  return d.toISOString();
};

const dayOffset = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

// Sample records, dated relative to today so the charts and due dates stay current.
export const loadSampleData = () => {
  const clients: Client[] = [
    { id: 'c1', name: 'Priya Raman', email: 'priya@halvorsenfreight.com', company: 'Halvorsen Freight', status: 'Active', createdAt: daysAgo(1, 15) },
    { id: 'c2', name: 'Marcus Oyelaran', email: 'marcus@brightlinedental.com', company: 'Brightline Dental', status: 'Active', createdAt: daysAgo(9) },
    { id: 'c3', name: 'Elena Kowalski', email: 'elena@kowalskiarchitects.com', company: 'Kowalski Architects', status: 'Pending', createdAt: daysAgo(16) },
    { id: 'c4', name: 'Tom Arceneaux', email: 'tom@bayoumarine.com', company: 'Bayou Marine Supply', status: 'Active', createdAt: daysAgo(31) },
    { id: 'c5', name: 'Grace Lindqvist', email: 'grace@northpinecabinets.com', company: 'North Pine Cabinets', status: 'Inactive', createdAt: daysAgo(58) },
    { id: 'c6', name: 'Daniel Abara', email: 'daniel@abaralogistics.com', company: 'Abara Logistics', status: 'Active', createdAt: daysAgo(74) },
  ];
  const leads: Lead[] = [
    { id: 'l1', name: 'Hannah Whitfield', email: '', source: 'Website', value: 4200, status: 'New', createdAt: daysAgo(0, 9) },
    { id: 'l2', name: 'Rafael Dominguez', email: '', source: 'Referral', value: 12500, status: 'Qualified', createdAt: daysAgo(1) },
    { id: 'l3', name: 'Ines Carvalho', email: '', source: 'LinkedIn', value: 6800, status: 'Contacted', createdAt: daysAgo(2, 14) },
    { id: 'l4', name: 'Owen Petrakis', email: '', source: 'Website', value: 2400, status: 'New', createdAt: daysAgo(2, 16) },
    { id: 'l5', name: 'Samira Haddad', email: '', source: 'Cold Outreach', value: 9000, status: 'Contacted', createdAt: daysAgo(4) },
    { id: 'l6', name: 'Jonah Feld', email: '', source: 'Referral', value: 15000, status: 'Qualified', createdAt: daysAgo(5, 11) },
    { id: 'l7', name: 'Mei Tanaka', email: '', source: 'Website', value: 3100, status: 'Lost', createdAt: daysAgo(6) },
    { id: 'l8', name: 'Callum Reyes', email: '', source: 'LinkedIn', value: 5600, status: 'New', createdAt: daysAgo(11) },
    { id: 'l9', name: 'Adaeze Nwosu', email: '', source: 'Cold Outreach', value: 7400, status: 'Lost', createdAt: daysAgo(19) },
  ];
  const tasks: Task[] = [
    { id: 't1', title: 'Send revised quote to Rafael Dominguez', priority: 'High', dueDate: dayOffset(0), completed: false, createdAt: daysAgo(1, 16) },
    { id: 't2', title: 'Call Ines Carvalho about onboarding dates', priority: 'Medium', dueDate: dayOffset(1), completed: false, createdAt: daysAgo(2, 15) },
    { id: 't3', title: 'Renew Bayou Marine Supply contract', priority: 'High', dueDate: dayOffset(3), completed: false, createdAt: daysAgo(3) },
    { id: 't4', title: 'Update Kowalski Architects billing contact', priority: 'Low', dueDate: dayOffset(6), completed: false, createdAt: daysAgo(4, 13) },
    { id: 't5', title: 'Follow up with Jonah Feld after demo', priority: 'Medium', dueDate: dayOffset(-1), completed: true, createdAt: daysAgo(5, 12) },
    { id: 't6', title: 'Prepare quarterly review for Halvorsen Freight', priority: 'Medium', dueDate: dayOffset(-3), completed: true, createdAt: daysAgo(8) },
  ];
  setStorage('clients', clients);
  setStorage('leads', leads);
  setStorage('tasks', tasks);
};

export const seedOnFirstVisit = () => {
  if (localStorage.getItem('crm_seeded')) return;
  localStorage.setItem('crm_seeded', '1');
  if (!localStorage.getItem('clients') && !localStorage.getItem('leads') && !localStorage.getItem('tasks')) {
    loadSampleData();
  }
};
