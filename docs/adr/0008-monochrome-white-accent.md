# Monochrome: white is the only accent

Supersedes ADR-0002. Once amber was on screen, the owner didn't like the orange. Four options were previewed (white, darkroom red, silver blue, pale brass) and the owner chose white.

The page is now only near-black, warm greys and white. Body text stays marble (`#E9E4DA`); pure white (`#FFFFFF`) is the accent and means "you are pointing at this". Because white is close to marble, every hover also changes shape: list titles switch to Instrument Serif italic, links get an underline.

The Darkroom keeps its idea without a colored safelight: the Prints hang under the white light of an enlarger, the lamp that projects a negative onto paper.

## Considered Options

- **Darkroom red**: rejected. Strong, but loud next to the marble Bust and close to "danger" for a security portfolio.
- **Silver blue**: rejected. Cold, reads more like a tech template.
- **Pale brass**: rejected. Closest to amber, which was the problem.

## Consequences

- Token `--amber` is renamed `--light` (`text-light`, `border-light`).
- The Hero name is the only thing pure white at rest.
