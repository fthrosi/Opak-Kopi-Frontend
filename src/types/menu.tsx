type categorymenu = {
  id: number;
  name: string;
}

export type MenuProps = {
  id: number;
  name: string;
  rating: number;
  current_price: number;
  description: string;
  kategori: string;
  image_url: string;
  category: categorymenu;
}