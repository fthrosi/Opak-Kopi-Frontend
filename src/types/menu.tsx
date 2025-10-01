type categorymenu = {
  id: number;
  name: string;
}

export type MenuProps = {
  id: number;
  name: string;
  current_price: number;
  current_cogs: number;
  description: string;
  image_url: string;
  category: categorymenu;
  status: string;
}