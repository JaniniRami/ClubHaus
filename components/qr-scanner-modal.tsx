"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, QrCode, CheckCircle } from "lucide-react"

interface QrScannerModalProps {
  onClose: () => void
}

export function QrScannerModal({ onClose }: QrScannerModalProps) {
  const [scannedStudent, setScannedStudent] = useState<string | null>(null)

  const handleMockScan = () => {
    setScannedStudent("Ahmad Ibrahim (20210001)")
    setTimeout(() => setScannedStudent(null), 2000)
  }

  return (
    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-md border border-border">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">QR Code Check-in</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed border-border">
            {scannedStudent ? (
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
                <p className="text-foreground font-semibold">Checked In!</p>
                <p className="text-sm text-muted-foreground">{scannedStudent}</p>
              </div>
            ) : (
              <div className="text-center">
                <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Position QR code in frame</p>
              </div>
            )}
          </div>

          <Button onClick={handleMockScan} variant="outline" className="w-full bg-transparent">
            Simulate Scan (Demo)
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Students can show their QR code from their profile
          </p>
        </div>
      </div>
    </div>
  )
}
