import re

with open('src/pages/Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
'''      {/* Latest Announcements */}
      <section className="mb-16">''',
'''      {/* Latest Announcements */}
      {announcements.length > 0 && (
      <section className="mb-16">'''
)

content = content.replace(
'''        </div>
      </section>

      {/* Upcoming Events */}''',
'''        </div>
      </section>
      )}

      {/* Upcoming Events */}'''
)

content = content.replace(
'''      {/* Upcoming Events */}
      <section className="mb-16">''',
'''      {/* Upcoming Events */}
      {events.length > 0 && (
      <section className="mb-16">'''
)

content = content.replace(
'''        </div>
      </section>

      {/* Temple Highlight */}''',
'''        </div>
      </section>
      )}

      {/* Temple Highlight */}'''
)

content = content.replace(
'''      {/* Temple Highlight */}
      <section className="mb-16">''',
'''      {/* Temple Highlight */}
      {temples.length > 0 && (
      <section className="mb-16">'''
)

content = content.replace(
'''        </div>
      </section>

      {/* Sri Ram Youth Highlight */}''',
'''        </div>
      </section>
      )}

      {/* Sri Ram Youth Highlight */}'''
)

content = content.replace(
'''      {/* Gallery Preview */}
      <section className="mb-16">''',
'''      {/* Gallery Preview */}
      {galleryItems.length > 0 && (
      <section className="mb-16">'''
)

content = content.replace(
'''        <GalleryGrid />
      </section>

      {/* Village Location */}''',
'''        <GalleryGrid />
      </section>
      )}

      {/* Village Location */}'''
)


with open('src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
