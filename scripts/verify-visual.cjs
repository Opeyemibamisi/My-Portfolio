const { chromium } = require('@playwright/test')

const targets = [
  { name: 'desktop', width: 1440, height: 980 },
  { name: 'mobile', width: 390, height: 844 },
]

async function main() {
  const browser = await chromium.launch({ channel: 'msedge' })
  const page = await browser.newPage()

  for (const target of targets) {
    await page.setViewportSize({ width: target.width, height: target.height })
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
    await page.locator('canvas').waitFor({ timeout: 15000 })
    await page.screenshot({ path: `visual-${target.name}.png`, fullPage: true })

    const sample = await page.locator('canvas').evaluate((canvas) => {
      const rect = canvas.getBoundingClientRect()
      const probe = document.createElement('canvas')
      probe.width = Math.max(1, Math.floor(rect.width))
      probe.height = Math.max(1, Math.floor(rect.height))
      const ctx = probe.getContext('2d')
      ctx.drawImage(canvas, 0, 0, probe.width, probe.height)
      const { data } = ctx.getImageData(0, 0, probe.width, probe.height)
      let lit = 0
      for (let i = 0; i < data.length; i += 64) {
        if (data[i] + data[i + 1] + data[i + 2] > 18) lit += 1
      }
      return { width: probe.width, height: probe.height, lit }
    })

    if (sample.width < 100 || sample.height < 100 || sample.lit < 20) {
      throw new Error(`${target.name} canvas appears blank or undersized: ${JSON.stringify(sample)}`)
    }
  }

  await browser.close()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
