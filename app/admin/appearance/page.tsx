"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Palette, Type, Image, Save, RotateCcw } from 'lucide-react'

export default function AppearancePage() {
  const [theme, setTheme] = useState({
    primaryColor: '#000000',
    secondaryColor: '#666666',
    accentColor: '#0066cc',
    fontFamily: 'Inter',
    fontSize: '16px',
    borderRadius: '8px'
  })

  const [customizations, setCustomizations] = useState({
    logoUrl: '',
    faviconUrl: '',
    heroImage: '',
    footerText: '© 2024 Handmade.world. All rights reserved.'
  })

  const fontFamilies = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Montserrat']
  const fontSizes = ['14px', '16px', '18px', '20px']
  const borderRadiuses = ['4px', '6px', '8px', '12px', '16px']

  const handleSave = () => {
    console.log('Theme saved:', theme)
    console.log('Customizations saved:', customizations)
    alert('Appearance settings saved! (UI-only prototype)')
  }

  const handleReset = () => {
    setTheme({
      primaryColor: '#000000',
      secondaryColor: '#666666',
      accentColor: '#0066cc',
      fontFamily: 'Inter',
      fontSize: '16px',
      borderRadius: '8px'
    })
    setCustomizations({
      logoUrl: '',
      faviconUrl: '',
      heroImage: '',
      footerText: '© 2024 Handmade.world. All rights reserved.'
    })
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Appearance Settings</h1>
            <p className="text-muted-foreground">
              Customize the platform&apos;s look and feel
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Colors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="primary-color"
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Input
                    value={theme.primaryColor}
                    onChange={(e) => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={theme.secondaryColor}
                    onChange={(e) => setTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Input
                    value={theme.secondaryColor}
                    onChange={(e) => setTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="accent-color">Accent Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="accent-color"
                    type="color"
                    value={theme.accentColor}
                    onChange={(e) => setTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Input
                    value={theme.accentColor}
                    onChange={(e) => setTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Select value={theme.fontFamily} onValueChange={(value) => setTheme(prev => ({ ...prev, fontFamily: value }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontFamilies.map((font) => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="font-size">Base Font Size</Label>
                <Select value={theme.fontSize} onValueChange={(value) => setTheme(prev => ({ ...prev, fontSize: value }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="border-radius">Border Radius</Label>
                <Select value={theme.borderRadius} onValueChange={(value) => setTheme(prev => ({ ...prev, borderRadius: value }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {borderRadiuses.map((radius) => (
                      <SelectItem key={radius} value={radius}>{radius}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Branding Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="logo-url">Logo URL</Label>
                <Input
                  id="logo-url"
                  value={customizations.logoUrl}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, logoUrl: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="favicon-url">Favicon URL</Label>
                <Input
                  id="favicon-url"
                  value={customizations.faviconUrl}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, faviconUrl: e.target.value }))}
                  placeholder="https://example.com/favicon.ico"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="hero-image">Hero Image URL</Label>
                <Input
                  id="hero-image"
                  value={customizations.heroImage}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, heroImage: e.target.value }))}
                  placeholder="https://example.com/hero.jpg"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="footer-text">Footer Text</Label>
                <Input
                  id="footer-text"
                  value={customizations.footerText}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, footerText: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border" style={{ 
                  backgroundColor: theme.primaryColor + '20',
                  borderColor: theme.primaryColor + '40'
                }}>
                  <h3 className="font-semibold mb-2" style={{ color: theme.primaryColor }}>
                    Sample Heading
                  </h3>
                  <p className="text-sm" style={{ color: theme.secondaryColor }}>
                    This is how your content will look with the selected theme.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    style={{ 
                      backgroundColor: theme.accentColor,
                      borderRadius: theme.borderRadius
                    }}
                  >
                    Primary Button
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    style={{ 
                      borderColor: theme.accentColor,
                      color: theme.accentColor,
                      borderRadius: theme.borderRadius
                    }}
                  >
                    Secondary Button
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Badge variant="default" style={{ backgroundColor: theme.accentColor }}>
                    Badge
                  </Badge>
                  <Badge variant="outline" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Outline Badge
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  )
}
