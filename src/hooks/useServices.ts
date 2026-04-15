import { useState, useEffect } from 'react';

export interface RawSheetRow {
  "Категория": string;
  "Услуга": string;
  "Цена": string;
}

export interface ServiceItem {
  name: string;
  price: string;
}

export interface ServiceCategory {
  category: string;
  services: ServiceItem[];
  image?: string;
}

// Map categories to existing assets
const categoryImages: Record<string, string> = {
  "ПАРИКМАХЕРСКИЕ УСЛУГИ": "/assets/1.png",
  "МАНИКЮР": "/assets/2.png",
  "ПЕДИКЮР": "/assets/3.png",
  "БРОВИ": "/assets/4.png",
  "МАКИЯЖ": "/assets/5.png",
  "ДЕПИЛЯЦИЯ": "/assets/6.png",
  "ПИРСИНГ": "/assets/7.png",
  "РЕСНИЦЫ": "/assets/8.png",
  "КОСМЕТОЛОГИЯ": "/assets/9.png",
  "МАССАЖ": "/assets/10.png",
};

const API_URL = 'https://sheetdb.io/api/v1/u6l3g07a3j7v7';

export const useServices = () => {
  const [data, setData] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch services');
        const rawData: RawSheetRow[] = await response.json();

        const transformedData = transformSheetData(rawData);
        setData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { data, loading, error };
};

const transformSheetData = (rows: RawSheetRow[]): ServiceCategory[] => {
  const categoriesMap: Map<string, ServiceItem[]> = new Map();
  let currentCategory = "";

  rows.forEach((row) => {
    // Fill category if empty
    if (row["Категория"] && row["Категория"].trim() !== "") {
      currentCategory = row["Категория"].trim();
    }

    // Skip if service is empty
    if (!row["Услуга"] || row["Услуга"].trim() === "") {
      return;
    }

    if (!currentCategory) return; // Should not happen if correctly formatted

    if (!categoriesMap.has(currentCategory)) {
      categoriesMap.set(currentCategory, []);
    }

    categoriesMap.get(currentCategory)?.push({
      name: row["Услуга"].trim(),
      price: row["Цена"].trim(),
    });
  });

  return Array.from(categoriesMap.entries()).map(([category, services]) => ({
    category,
    services,
    image: categoryImages[category] || "/assets/1.png", // Fallback image
  }));
};
