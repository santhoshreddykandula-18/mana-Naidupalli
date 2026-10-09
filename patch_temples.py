with open('src/pages/Temples.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
'''      {/* All Temples Grid */}
      <h3 className="text-xl font-bold text-text-primary mb-6">{t('temples.otherTemples')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {temples.slice(1).map((temple) => (
          <TempleCard key={temple.id} temple={temple} />
        ))}
      </div>''',
'''      {/* All Temples Grid */}
      {temples.length > 1 && (
        <>
          <h3 className="text-xl font-bold text-text-primary mb-6">{t('temples.otherTemples')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temples.slice(1).map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        </>
      )}'''
)

with open('src/pages/Temples.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
