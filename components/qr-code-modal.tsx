"use client"

import { Button } from "@/components/ui/button"
import { X, QrCode, Download, Share2 } from "lucide-react"
import type { StudentData } from "@/components/onboarding-screen"
import { QRCodeSVG } from "qrcode.react"
import { useRef } from "react"

interface QrCodeModalProps {
  studentData: StudentData
  onClose: () => void
}

export function QrCodeModal({ studentData, onClose }: QrCodeModalProps) {
  const qrData = `ClubHaus-${studentData.studentId}`
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector("svg")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `clubhaus-qr-${studentData.studentId}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
    }

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
  }

  const handleShare = async () => {
    if (navigator.share && qrRef.current) {
      try {
        const svg = qrRef.current.querySelector("svg")
        if (svg) {
          const svgData = new XMLSerializer().serializeToString(svg)
          const blob = new Blob([svgData], { type: "image/svg+xml" })
          const file = new File([blob], `clubhaus-qr-${studentData.studentId}.svg`, { type: "image/svg+xml" })
          await navigator.share({
            title: "My ClubHaus QR Code",
            text: `Student ID: ${studentData.studentId}`,
            files: [file],
          })
        }
      } catch (err) {
        // Fallback if share fails
        handleDownload()
      }
    } else {
      // Fallback to download
      handleDownload()
    }
  }

  return (
    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-md border border-border overflow-hidden">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">My QR Code</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          {/* Student Info */}
          <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-foreground mb-1">{studentData.name}</h3>
            <p className="text-sm text-muted-foreground mb-0.5">ID: {studentData.studentId}</p>
            <p className="text-xs text-muted-foreground">{studentData.major}</p>
          </div>

          {/* QR Code Display */}
          <div
            ref={qrRef}
            className="aspect-square bg-white rounded-2xl p-6 mb-4 flex items-center justify-center border-2 border-dashed border-border"
          >
            <QRCodeSVG
              value={qrData}
              size={280}
              level="H"
              includeMargin={false}
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <p className="text-xs text-muted-foreground text-center">
              Show this QR code to club admins to check in to events. Your attendance will be automatically recorded.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleDownload} variant="outline" className="flex-1 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleShare} className="flex-1 bg-primary hover:bg-primary/90">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
