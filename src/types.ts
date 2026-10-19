export interface Product {
  id: string;
  name: string;
  category: 'Thực phẩm' | 'Đồ uống' | 'Thảo dược' | 'Thủ công';
  stars: 3 | 4 | 5;
  lat: number;
  lng: number;
  decisionNumber: string;
  validUntil: string;
  district: string;
  producer: string;
  representative: string;
  phone: string;
  address: string;
  image: string;
  story: string;
  standards: string[];
}

export interface LegalDoc {
  id: string;
  code: string;
  issuer: string;
  signDate: string;
  type: string;
  category: string;
  summary: string;
  contentDetails: string;
  fileType: string;
}

export interface SubmittedApplication {
  id: string;
  producer: string;
  product: string;
  district: string;
  representative: string;
  phone: string;
  status: string;
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export type ActiveTab = 'products' | 'map' | 'docs' | 'guide';
