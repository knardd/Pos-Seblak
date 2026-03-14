import React from 'react';

const Receipt = ({ items = [], total = 0, amountPaid = 0, changeAmount = 0, selectedLevel = null }) => {
    return (
        <div id="thermal-receipt" className="receipt-wrapper">
            <style dangerouslySetInnerHTML={{ __html: `
                @media screen {
                    .receipt-wrapper { display: none; }
                }
                @media print {
                    @page { 
                        size: 58mm auto;
                        margin: 0; 
                    }
                    body { 
                        margin: 0; 
                        padding: 0;
                        width: 58mm;
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 10px;
                        color: #000;
                    }
                    .receipt-wrapper { 
                        display: block; 
                        width: 58mm;
                        padding: 2mm;
                        background: white;
                    }
                    .text-center { text-align: center; }
                    .text-right { text-align: right; }
                    .font-bold { font-weight: bold; }
                    .dashed-line { border-bottom: 1px dashed #000; margin: 4px 0; }
                    .item-row { display: flex; justify-content: space-between; margin-bottom: 2px; }
                    .header-title { font-size: 14px; font-weight: bold; margin-bottom: 2px; }
                    .footer { margin-top: 10px; font-size: 8px; }
                }
            `}} />

            <div className="text-center">
                <div className="header-title">POS SEBLAK</div>
                <div>Jl. Raya Pedas No. 123</div>
                <div>0812-3456-7890</div>
            </div>
            
            <div className="dashed-line"></div>
            
            <div className="item-row">
                <span>Tgl: {new Date().toLocaleDateString('id-ID')}</span>
                <span>{new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div>Kasir: Admin</div>
            
            <div className="dashed-line"></div>

            {items.map((item, index) => (
                <div key={index} style={{ marginBottom: '4px' }}>
                    <div className="item-row">
                        <span className="font-bold">{item.name}</span>
                        <span>{(item.qty * item.price).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="item-row" style={{ fontSize: '9px' }}>
                        <span>{item.qty} x {item.price.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            ))}

            {selectedLevel && (
                <div className="item-row" style={{ marginBottom: '4px' }}>
                    <span>Level: {selectedLevel.name}</span>
                    <span>{Number(selectedLevel.extra_price).toLocaleString('id-ID')}</span>
                </div>
            )}

            <div className="dashed-line"></div>
            
            <div className="item-row font-bold">
                <span>TOTAL</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <div className="item-row">
                <span>Bayar</span>
                <span>Rp {Number(amountPaid).toLocaleString('id-ID')}</span>
            </div>
            <div className="item-row">
                <span>Kembali</span>
                <span>Rp {changeAmount.toLocaleString('id-ID')}</span>
            </div>

            <div className="dashed-line"></div>
            
            <div className="text-center footer">
                TERIMA KASIH<br/>
                Sudah jajan di Seblak Kami!<br/>
                Ditunggu kedatangannya kembali.
            </div>
        </div>
    );
};

export default Receipt;
