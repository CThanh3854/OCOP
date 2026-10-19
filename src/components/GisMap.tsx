import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../types';
import { FALLBACK_IMG } from '../data/mockData';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';

interface GisMapProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const GisMap: React.FC<GisMapProps> = ({
  products,
  onSelectProduct,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | 'ALL'>('ALL');

  const filteredProducts = selectedStar === 'ALL'
    ? products
    : products.filter((p) => p.stars === selectedStar);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([21.35, 105.61], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const layer = L.layerGroup().addTo(map);
      markersLayerRef.current = layer;
      mapInstanceRef.current = map;
    }

    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Update Markers when filter or products change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    filteredProducts.forEach((p) => {
      const markerColor =
        p.stars === 5 ? '#f59e0b' : p.stars === 4 ? '#10b981' : '#3b82f6';

      const customIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="background-color: ${markerColor}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2.5px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); font-weight: bold; font-size: 11px;">
                ${p.stars}★
               </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([p.lat, p.lng], { icon: customIcon });

      const popupContent = document.createElement('div');
      popupContent.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
      popupContent.style.width = '210px';
      popupContent.innerHTML = `
        <div style="width: 100%; height: 95px; border-radius: 8px; overflow: hidden; margin-bottom: 6px; background: #f3f4f6;">
          <img src="${p.image}" onerror="this.src='${FALLBACK_IMG}'" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <span style="font-size: 10px; font-weight: bold; background: #ecfdf5; color: #047857; padding: 2px 6px; border-radius: 4px;">
          ${p.stars} SAO OCOP
        </span>
        <h4 style="font-size: 12px; font-weight: bold; margin: 4px 0; color: #111827; line-height: 1.3;">
          ${p.name}
        </h4>
        <p style="font-size: 10px; color: #6b7280; margin-bottom: 8px;">
          ${p.producer}
        </p>
      `;

      const viewBtn = document.createElement('button');
      viewBtn.innerText = 'Xem Hồ Sơ OCOP';
      viewBtn.style.cssText =
        'width: 100%; padding: 6px 0; background: #047857; color: white; border: none; border-radius: 6px; font-size: 10px; cursor: pointer; font-weight: bold;';
      viewBtn.onclick = () => {
        onSelectProduct(p);
      };
      popupContent.appendChild(viewBtn);

      marker.bindPopup(popupContent);
      layer.addLayer(marker);
    });
  }, [filteredProducts, onSelectProduct]);

  const handleFocus = (lat: number, lng: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 14, { duration: 1 });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100">
      {/* Header & Star Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 text-green-700 mr-2" />
            Bản Đồ Số Định Vị Nông Sản OCOP Địa Phương
          </h3>
          <p className="text-xs text-gray-500">
            Trực quan hóa vị trí vùng nguyên liệu và cơ sở chế biến OCOP trên bản đồ GIS vệ tinh.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs flex-wrap gap-y-1">
          <span className="font-bold text-gray-500">Lọc sao:</span>
          <button
            onClick={() => setSelectedStar('ALL')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
              selectedStar === 'ALL'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setSelectedStar(5)}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              selectedStar === 5
                ? 'bg-yellow-500 text-white'
                : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
            }`}
          >
            5 Sao ⭐
          </button>
          <button
            onClick={() => setSelectedStar(4)}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              selectedStar === 4
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
            }`}
          >
            4 Sao ⭐
          </button>
          <button
            onClick={() => setSelectedStar(3)}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              selectedStar === 3
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
            }`}
          >
            3 Sao ⭐
          </button>
        </div>
      </div>

      {/* Map & List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 shadow-inner border border-gray-200 rounded-2xl overflow-hidden relative isolate z-1">
          <div ref={mapContainerRef} className="h-[480px] w-full rounded-2xl z-1" />
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Nhấp cơ sở để bay đến vị trí ({filteredProducts.length}):
          </div>
          <div className="space-y-2.5">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleFocus(p.lat, p.lng)}
                className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 hover:border-green-600 transition cursor-pointer flex items-center justify-between text-xs group"
              >
                <div className="pr-2">
                  <span
                    className={`text-[10px] font-bold ${
                      p.stars === 5 ? 'text-yellow-600' : 'text-green-700'
                    }`}
                  >
                    {p.stars} SAO
                  </span>
                  <h5 className="font-bold text-gray-900 line-clamp-1 group-hover:text-green-700 transition">
                    {p.name}
                  </h5>
                  <p className="text-[10px] text-gray-500 truncate">{p.district}</p>
                </div>
                <button
                  type="button"
                  className="w-7 h-7 bg-white text-green-700 rounded-lg border border-gray-200 flex items-center justify-center text-xs shadow-xs group-hover:bg-green-700 group-hover:text-white transition shrink-0 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
