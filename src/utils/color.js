
export function getDefaultColor() {
  return {
    fill: {
      red: 30 / 255,
      green: 195 / 255,
      blue: 201 / 255,
      alpha: 0.4
    },
    stroke: {
      red: 30 / 255,
      green: 195 / 255,
      blue: 201 / 255,
      alpha: 1
    }
  }
}

export function colorToRGBA(color) {
  const parts = color.replace(/rgba|rgb|\(|\)/gm, '')
    .split(/\s|,/g).filter((val) => val !== '').map((val, index) => index > 2 ? val : val / 255)
  return {
    red: parts[0],
    green: parts[1],
    blue: parts[2],
    alpha: parts[3]
  }
}

