'use client';

import { useEffect, useState } from 'react';

const rup = (n: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

export default function DashboardClient() {
  const [d, setD] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(setD);
  }, []);

  if (!d) return <div className="container">Memuat dashboard...</div>;

  // Mencegah error jika array chart masih kosong
  const chartData = d.chart || [];
  const max = Math.max(...chartData.map((x: any) => x.total), 1);

  return (
    <div className="container">
      
      <div className="dashboard-greeting">
        <h1>Dashboard</h1>
        <p>Selamat datang di UT Shop</p>
      </div>
      
      <div className="grid">
        <div className="stat-card">
          <div className="stat-icon">Rp</div>
          <div>
            <div className="stat-label">Penjualan Hari Ini</div>
            <div className="stat-value">{rup(d.todaySales || 0)}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">#</div>
          <div>
            <div className="stat-label">Transaksi Hari Ini</div>
            <div className="stat-value">{d.todayCount || 0}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orange">%</div>
          <div>
            <div className="stat-label">Keuntungan</div>
            <div className="stat-value">{rup(d.totalProfit || 0)}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon red">!</div>
          <div>
            <div className="stat-label">Stok Menipis</div>
            <div className="stat-value">{d.lowStock || 0}</div>
          </div>
        </div>
      </div>
      
      <div className="two section">
        <div className="card">
          <h2 className="card-title">Grafik Penjualan 7 Hari Terakhir</h2>
          <div className="chart">
            <div className="chart-grid">
              <span/><span/><span/><span/>
            </div>
            <div className="bars">
              {chartData.map((x: any) => (
                <div className="bar-wrap" key={x.day}>
                  <div 
                    className="bar" 
                    title={rup(x.total || 0)} 
                    style={{ height: `${Math.max(((x.total || 0) / max) * 82, 3)}%` }}
                  />
                  <span className="bar-label">{x.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="card-title">Transaksi Terbaru</h2>
          {d.recent && d.recent.map((s: any) => (
            <div key={s.id} className="recent-row">
              <div>
                <div className="recent-id">{s.invoiceNo}</div>
                <div className="recent-date">{new Date(s.date).toLocaleDateString('id-ID')}</div>
              </div>
              <div className="recent-total">{rup(s.total || 0)}</div>
            </div>
          ))}
          
          {(!d.recent || d.recent.length === 0) && (
            <div className="muted">Belum ada transaksi.</div>
          )}
        </div>
      </div>
      
    </div>
  );
}