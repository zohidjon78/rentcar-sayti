export interface Car {
  id: string;
  name: string;
  category: 'ekonom' | 'komfort' | 'biznes' | 'suv' | 'sport';
  price: number; // so'm/kun
  image: string;
  year: number;
  transmission: 'Avtomat' | 'Mexanika';
  fuel: 'Benzin' | 'Gibrid' | 'Elektr' | 'Metan';
  seats: number;
  featured?: boolean;
}

export const CARS_DATA: Car[] = [
  {
    id: 'malibu-2',
    name: 'Chevrolet Malibu 2 Premier',
    category: 'biznes',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    year: 2023,
    transmission: 'Avtomat',
    fuel: 'Benzin',
    seats: 5,
    featured: true
  },
  {
    id: 'captiva-5',
    name: 'Chevrolet Captiva 5',
    category: 'suv',
    price: 600000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    year: 2024,
    transmission: 'Avtomat',
    fuel: 'Benzin',
    seats: 7,
    featured: true
  },
  {
    id: 'kia-k5',
    name: 'Kia K5 GT-Line',
    category: 'biznes',
    price: 800000,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    year: 2023,
    transmission: 'Avtomat',
    fuel: 'Benzin',
    seats: 5,
    featured: true
  },
  {
    id: 'toyota-camry',
    name: 'Toyota Camry 75',
    category: 'biznes',
    price: 900000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
    year: 2023,
    transmission: 'Avtomat',
    fuel: 'Gibrid',
    seats: 5,
    featured: true
  },
  {
    id: 'gentra-lacetti',
    name: 'Chevrolet Gentra Elegance Plus',
    category: 'komfort',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    year: 2023,
    transmission: 'Avtomat',
    fuel: 'Benzin',
    seats: 5
  },
  {
    id: 'tracker-2',
    name: 'Chevrolet Tracker Redline',
    category: 'suv',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    year: 2024,
    transmission: 'Avtomat',
    fuel: 'Benzin',
    seats: 5,
    featured: true
  },
  {
    id: 'cobalt',
    name: 'Chevrolet Cobalt GX-Style',
    category: 'ekonom',
    price: 300000,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    year: 2024,
    transmission: 'Avtomat',
    fuel: 'Benzin',
    seats: 5
  },
  {
    id: 'spark',
    name: 'Chevrolet Spark Optimum',
    category: 'ekonom',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
    year: 2022,
    transmission: 'Avtomat',
    fuel: 'Benzin',
    seats: 4
  },
  {
    id: 'monjaro',
    name: 'Geely Monjaro Flagship',
    category: 'suv',
    price: 1100000,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    year: 2024,
    transmission: 'Avtomat',
    fuel: 'Gibrid',
    seats: 5
  },
  {
    id: 'bmw-m5',
    name: 'BMW 530i M Sport',
    category: 'sport',
    price: 1500000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    year: 2023,
    transmission: 'Avtomat',
    fuel: 'Benzin',
    seats: 5
  }
];
