import re

with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Make the cards link to the section
text = text.replace('<Card variant="outlined" hoverable padding="none" className="overflow-hidden group">', '<Link to="/sri-ram-youth" className="overflow-hidden group">\n          <Card variant="outlined" hoverable padding="none" className="h-full">')
text = text.replace('          </div>\n        </Card>', '          </div>\n          </Card>\n        </Link>')

# Fix images
text = text.replace('src="https://images.unsplash.com/photo-1582554746657-3aabfe873347?auto=format&fit=crop&q=80&w=400&h=400"\n              alt="Sri Ram Youth celebration"', 'src="/sri-ram-youth/photos/youth-committee-banner.jpg"\n              alt="Sri Ram Youth celebration"')
text = text.replace('src="https://images.unsplash.com/photo-1604505370258-29efaf988891?auto=format&fit=crop&q=80&w=400&h=400"\n              alt="Sri Ram Youth community service"', 'src="/sri-ram-youth/photos/bg3.png"\n              alt="Sri Ram Youth community service"')
text = text.replace('src="https://images.unsplash.com/photo-1595188612140-5e3477e682af?auto=format&fit=crop&q=80&w=400&h=400"\n              alt="Video thumbnail"', 'src="/sri-ram-youth/photos/bg2.png"\n              alt="Video thumbnail"')
text = text.replace('src="https://images.unsplash.com/photo-1582554746657-3aabfe873347?auto=format&fit=crop&q=80&w=400&h=400"\n              alt="Video thumbnail"', 'src="/sri-ram-youth/photos/ganesha-main.jpeg"\n              alt="Video thumbnail"')

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(text)

