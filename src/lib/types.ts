export interface Province {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Word {
  id: number;
  title: string;
  slug: string;
  description: string;
  video_url: string;
  category_id: number;
  province_id: number;
  status: "draft" | "review" | "published";
}
