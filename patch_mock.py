with open("src/data/mockDb.ts", "r") as f:
    text = f.read()

text = text.replace(
"export const cricketTeams: CricketTeam[] = [];",
"export const cricketTeams: CricketTeam[] = [\n  { id: '1', name: 'Naidupalli Pirates', captain: 'Captain Name', players: 37 }\n];"
)

with open("src/data/mockDb.ts", "w") as f:
    f.write(text)
