const seedUsers = (m) => {
  return Promise.all([
    m.User.create({
      email: 'leonardo.mosciatti@mail.polimi.it',
      password: m.User.generateHash('password'),
      first_name: 'Leonardo',
      last_name: 'Mosciatti',
    }),
    m.User.create({
      email: 'admin@example.org',
      password: m.User.generateHash('password'),
      first_name: 'John',
      last_name: 'Doe',
    }),
    m.User.create({
      email: 'gianni@example.org',
      password: m.User.generateHash('password'),
      first_name: 'Gianni',
      last_name: 'Rossi',
    }),
    m.User.create({
      email: 'laura@example.org',
      password: m.User.generateHash('password'),
      first_name: 'Laura',
      last_name: 'Gregori',
    }),
  ])
    .then(([
      user_leonardo,
      user_admin,
      user_gianni,
      user_laura,
           ]) => { return {
      user_leonardo,
      user_admin,
      user_gianni,
      user_laura,
    }})
};

const seedGenres = (m) => {
  return Promise.all([
    m.Genre.create({
      name: 'fantasy',
      description: 'Fantasy is a genre of speculative fiction set in a fictional universe, often inspired by ' +
        'real world myth and folklore.',
    }),
    m.Genre.create({
      name: 'scifi',
      description: 'Science fiction (often abbreviated Sci-Fi or SF) is a genre of speculative fiction that has been ' +
        'called the "literature of ideas". It typically deals with imaginative and futuristic concepts such as ' +
        'advanced science and technology, time travel, parallel universes, fictional worlds, space exploration, and ' +
        'extraterrestrial life.',
    }),
    m.Genre.create({
      name: 'dystopia',
      description: 'A dystopia is a society characterized by a focus on that which is contrary to the author\'s ethos, ' +
        'such as mass poverty, public mistrust and suspicion, a police state or oppression. Most authors of dystopian ' +
        'fiction explore at least one reason why things are that way, often as an analogy for similar issues in the ' +
        'real world.',
    }),
    m.Genre.create({
      name: 'thriller',
      description: 'Thrillers are characterized and defined by the moods they elicit, giving viewers heightened ' +
        'feelings of suspense, excitement, surprise, anticipation and anxiety',
    }),
    m.Genre.create({
      name: 'novel',
      description: 'A novel is a relatively long work of narrative fiction, normally written in prose form, and' +
        ' which is typically published as a book. The entire genre has been seen as having "a continuous and ' +
        'comprehensive history of about two thousand years", with its origins in classical Greece and Rome, ' +
        'in medieval and early modern romance, and in the tradition of the Italian renaissance novella. ' +
        '(Since the 18th century, the term "novella", or "novelle" in German, has been used in English and ' +
        'other European languages to describe a long short story or a short novel.) ',
    }),
    m.Genre.create({
      name: 'essay',
      description: 'An essay is, generally, a piece of writing that gives the author\'s own argument — but the ' +
        'definition is vague, overlapping with those of a paper, an article, a pamphlet, and a short story. ' +
        'Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized ' +
        'by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized ' +
        'by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, ' +
        'graceful style, rambling structure, unconventionality or novelty of theme," etc.',
    }),
  ])
    .then(([
      genre_fantasy,
      genre_scifi,
      genre_dystopia,
      genre_thriller,
      genre_novel,
      genre_essay
           ]) => { return {
      genre_fantasy,
      genre_scifi,
      genre_dystopia,
      genre_thriller,
      genre_novel,
      genre_essay
    }})
};

const seedAuthors = (m) => {
  return Promise.all([
    m.Author.create({
      first_name: 'George',
      last_name: 'Orwell',
      biography: 'Orwell was born Eric Arthur Blair on 25 June 1903 in eastern India, the son of a British ' +
        'colonial civil servant. He was educated in England and, after he left Eton, joined the Indian ' +
        'Imperial Police in Burma, then a British colony. He resigned in 1927 and decided to become a writer. ' +
        'In 1928, he moved to Paris where lack of success as a writer forced him into a series of menial jobs. ' +
        'He described his experiences in his first book, \'Down and Out in Paris and London\', published in 1933. ' +
        'He took the name George Orwell, shortly before its publication. ' +
        'This was followed by his first novel, \'Burmese Days\', in 1934.\n' +
        '\n' +
        'An anarchist in the late 1920s, by the 1930s he had begun to consider himself a socialist. ' +
        'In 1936, he was commissioned to write an account of poverty among unemployed miners in northern England, ' +
        'which resulted in \'The Road to Wigan Pier\' (1937). Late in 1936, Orwell travelled to Spain to fight ' +
        'for the Republicans against Franco\'s Nationalists. He was forced to flee in fear of his life ' +
        'from Soviet-backed communists who were suppressing revolutionary socialist dissenters. ' +
        'The experience turned him into a lifelong anti-Stalinist.\n' +
        '\n' +
        'Between 1941 and 1943, Orwell worked on propaganda for the BBC. In 1943, he became literary editor ' +
        'of the Tribune, a weekly left-wing magazine. By now he was a prolific journalist, ' +
        'writing articles, reviews and books.\n' +
        '\n' +
        'In 1945, Orwell\'s \'Animal Farm\' was published. A political fable set in a farmyard but ' +
        'based on Stalin\'s betrayal of the Russian Revolution, it made Orwell\'s name and ensured ' +
        'he was financially comfortable for the first time in his life. \'Nineteen Eighty-Four\' ' +
        'was published four years later. Set in an imaginary totalitarian future, the book made a ' +
        'deep impression, with its title and many phrases - such as \'Big Brother is watching you\', ' +
        '\'newspeak\' and \'doublethink\' - entering popular use. By now Orwell\'s health was ' +
        'deteriorating and he died of tuberculosis on 21 January 1950.',
      birthdate: new Date(1903, 5, 25),
      picture: 'orwell.jpg'
    }),
    m.Author.create({
      first_name: 'Ernest',
      last_name: 'Hemingway',
      biography: 'Ernest Hemingway, famous author and journalist, was born in the affluent Chicago suburb of ' +
        'Oak Park, Illinois, on July 21, 1899. His father was a doctor; his mother, a musician. He was named ' +
        'after his maternal grandfather, Ernest Hall. As a young man, he was interested in writing; he ' +
        'wrote for and edited his high school’s newspaper, as well as the high school yearbook. ' +
        'Upon graduating from Oak Park and River Forest High School in 1917, he worked for the Kansas City Star ' +
        'newspaper briefly, but in that short time, he learned the writing style that would shape ' +
        'nearly all of his future work.\n' +
        '\n' +
        'As an ambulance driver in Italy during World War I, Ernest Hemingway was wounded and spent several months ' +
        'in the hospital. While there, he met and fell in love with a Red Cross nurse named Agnes von Kurowsky. ' +
        'They planned to marry; however, she became engaged to an Italian officer instead.\n' +
        '\n' +
        'This experience devastated Hemingway, and Agnes became the basis for the female characters in his ' +
        'subsequent short stories “A Very Short Story” (1925) and “The Snows of Kilimanjaro” (1936), ' +
        'as well as the famous novel “A Farewell To Arms” (1929). This would also start a pattern ' +
        'Ernest would repeat for the rest of his life – leaving women before ' +
        'they had the chance to leave him first.\n' +
        '\n' +
        'Ernest Hemingway began work as a journalist upon moving to Paris in the early 1920s, but he still found ' +
        'time to write. He was at his most prolific in the 20s and 30s. His first short story collection, ' +
        'aptly titled “Three Stories and Ten Poems,” was published in 1923. His next short story collection, ' +
        '“In Our Time,” published in 1925, was the formal introduction of the vaunted Hemingway style to the ' +
        'rest of the world, and considered one of the most important works of 20th century prose. ' +
        'He would then go on to write some of the most famous works of the 20th century, including ' +
        '“A Farewell to Arms,” “The Sun Also Rises,” “For Whom the Bell Tolls,” and “The Old Man and the Sea.” ' +
        'He also won the Nobel Prize for Literature in 1954.',
      birthdate: new Date(1899, 6, 21),
      picture: 'hemingway.jpg'
    }),
    m.Author.create({
      first_name: 'Umberto',
      last_name: 'Eco',
      biography: ' Umberto Eco was born in the city of Alessandria in the Italian region of Piedmont,  ' +
        'right in the middle of the Genova, Milan, Turin triangle.\n' +
        '\n' +
        'Before he was drafted to fight in 3 wars, his father, Giulio Eco, was an accountant.\n' +
        '\n' +
        'Young Umberto and his mother, Giovanna, moved to a small village in the Piedmontese ' +
        'mountainside during the Second World War.\n' +
        '\n' +
        'Eco received a Salesian education, and he has made references to the order ' +
        'and its founder in his works and interviews.\n' +
        '\n' +
        'His family name is supposedly an acronym of ex caelis oblatus (Latin: a gift from the heavens), ' +
        'which was given to his grandfather (a foundling) by a city official.\n' +
        '\n' +
        'His father came from a family of thirteen children, and was very keen fo Umberto to read Law, ' +
        'but instead he entered the University of Turin in order to take up medieval philosophy and literature. ' +
        'Umberto\'s thesis was on the topic of Thomas Aquinas and this earned him a BA in philosophy in 1954. ' +
        'In that period, Eco abandoned the Roman Catholic Church after a crisis of faith.\n' +
        '\n' +
        'Following this, Eco worked as a cultural editor for RAI, Radiotelevisione Italiana, the state ' +
        'broadcasting station, he also became a lecturer at the University of Turin (1956–64).\n' +
        '\n' +
        'A group of avant-garde artists—painters, musicians, writers—whom he had befriended at RAI (Gruppo 63) ' +
        'became an important and influential component in Eco\'s future writing career. This was especially true ' +
        'after the publication of his first book in 1956, Il problema estetico di San Tommaso, which was ' +
        'an extension of his doctoral thesis. This also marked the beginning of ' +
        'his lecturing career at his alma mater.\n' +
        '\n' +
        'In September 1962, he married Renate Ramge, a German art teacher with whom he has a son and a daughter. ' +
        'He divides his time between an apartment in Milan and a vacation house near Rimini. ' +
        'He has a 30,000 volume library in the former and a 20,000 volume library in the latter. ',
      birthdate: new Date(1932, 0, 5),
      picture: 'eco.jpg'
    }),
    m.Author.create({
      first_name: 'Ken',
      last_name: 'Follett',
      biography: 'Ken Follett is one of the world’s best-loved novelists. His latest book, ' +
        'A Column of Fire – the third novel in his Kingsbridge Series – went straight to the No.1 ' +
        'position on bestseller lists in the USA, Spain, Italy, Germany and France.\n' +
        '\n' +
        'He burst into the book world in 1978 with Eye of the Needle, a taut and original thriller with a ' +
        'memorable woman character in the central role. The book won the Edgar award and became an outstanding ' +
        'film starring Kate Nelligan and Donald Sutherland.\n' +
        '\n' +
        'He went on to write four more best-selling thrillers: Triple; The Key to Rebecca; ' +
        'The Man from St Petersburg; and Lie Down with Lions. Cliff Robertson and David Soul starred in the ' +
        'miniseries of The Key to Rebecca. In 1994 Timothy Dalton, Omar Sharif and Marg Helgenberger ' +
        'starred in the miniseries of Lie Down with Lions.\n' +
        '\n' +
        'He also wrote On Wings of Eagles, the true story of how two employees of Ross Perot were rescued ' +
        'from Iran during the revolution of 1979. This book was made into a miniseries with Richard Crenna as ' +
        'Ross Perot and Burt Lancaster as Colonel ‘Bull’ Simons.\n' +
        '\n' +
        'He then surprised readers by radically changing course with The Pillars of the Earth, a novel ' +
        'about building a cathedral in the Middle Ages. Published in September 1989 to rave reviews, ' +
        'it was on The New York Times bestseller list for eighteen weeks. It also reached the No. 1 ' +
        'position on lists in Canada, Great Britain and Italy, and was on the German bestseller list for six years.',
      birthdate: new Date(1949, 5, 5),
      picture: 'follett.jpg'
    }),
    m.Author.create({
      first_name: 'Luigi',
      last_name: 'Pirandello',
      biography: 'Luigi Pirandello was an Italian dramatist, novelist, poet, and short story writer whose ' +
        'greatest contributions were his plays.[1] He was awarded the 1934 Nobel Prize in Literature for ' +
        '"his almost magical power to turn psychological analysis into good theatre."[2] Pirandello\'s works ' +
        'include novels, hundreds of short stories, and about 40 plays, some of which are written in Sicilian. ' +
        'Pirandello\'s tragic farces are often seen as forerunners of the Theatre of the Absurd. ',
      birthdate: new Date(1867, 5, 28),
      picture: 'pirandello.jpg'
    }),
    m.Author.create({
      first_name: 'Thomas',
      last_name: 'Cormen',
      biography: 'Thomas H. Cormen is Professor and former Chair of the Dartmouth College Department of ' +
        'Computer Science and former director of the Dartmouth College Institute for Writing and Rhetoric. ' +
        'He received the B.S.E. degree in Electrical Engineering and Computer Science from Princeton University ' +
        'in 1978 and the S.M. and Ph.D. degrees in Electrical Engineering and Computer Science from MIT in ' +
        '1986 and 1993, respectively. He is coauthor of the leading textbook on computer algorithms, ' +
        'Introduction to Algorithms, which he wrote with Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein.' +
        ' The book, now in its third edition, has been translated into several languages. He is also the ' +
        'author of Algorithms Unlocked, a gentle introduction to understanding computer algorithms and how they ' +
        'relate to real-world problems.',
      birthdate: new Date(1956, 5, 28),
      picture: 'cormen.jpg'
    }),
    m.Author.create({
      first_name: 'Charles',
      last_name: 'Leiserson',
      biography: 'Charles E. Leiserson is Professor of Computer Science and Engineering at the ' +
        'Massachusetts Institute of Technology.',
      birthdate: new Date(1956, 10, 10),
      picture: 'leiserson.jpg'
    }),

  ])
    .then(([
      author_orwell,
      author_hemingway,
      author_eco,
      author_follett,
      author_pirandello,
      author_cormen,
      author_leiserson,
           ]) => { return {
      author_orwell,
      author_hemingway,
      author_eco,
      author_follett,
      author_pirandello,
      author_cormen,
      author_leiserson,
    }})
};

const seedThemes = (m) => {
  return Promise.all([
    m.Theme.create({
      name: 'peace',
    }),
    m.Theme.create({
      name: 'war',
    }),
    m.Theme.create({
      name: 'love',
    }),
    m.Theme.create({
      name: 'death',
    }),
    m.Theme.create({
      name: 'friendship',
    }),
    m.Theme.create({
      name: 'justice',
    }),
    m.Theme.create({
      name: 'science',
    }),
  ])
    .then(([
      theme_peace,
      theme_war,
      theme_love,
      theme_death,
      theme_friendship,
      theme_justice,
      theme_science,
           ]) => { return {
      theme_peace,
      theme_war,
      theme_love,
      theme_death,
      theme_friendship,
      theme_justice,
      theme_science,
    }})
};

const loremIpsumForReview = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque risus mi, congue quis ' +
  'nisl sit amet, pulvinar fermentum eros. Aliquam nisi quam, tempor aliquam blandit non, posuere vel orci. ' +
  'Vestibulum varius tempor mi, pellentesque cursus est efficitur ornare. Donec id tincidunt urna. Nam posuere.';
const seedReviews = (m) => {
  return Promise.all([
    m.Review.create({
      content: '\n' +
        'This book had true potential. It was a joy to read.\n' +
        'There were scenes and lines that made me sit there and cry. Or laugh. Or cheer. ' +
        'The characters drove the plot to a satisfying conclusion, and resolved every issue.',
      rating: 4,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: 'Such a fun read, I highly recommend!',
      rating: 5,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: 'I loved the plot twists and loved the chemistry between the two main characters. ' +
        'I ordered the next book so excited. Amazing!',
      rating: 4,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: loremIpsumForReview,
      rating: 4,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: loremIpsumForReview,
      rating: 5,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: loremIpsumForReview,
      rating: 1,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: loremIpsumForReview,
      rating: 2,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: loremIpsumForReview,
      rating: 3,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: loremIpsumForReview,
      rating: 4,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: loremIpsumForReview,
      rating: 5,
      date: new Date(2019, 1, 1)
    }),
    m.Review.create({
      content: loremIpsumForReview,
      rating: 1,
      date: new Date(2019, 1, 1)
    }),
  ])
    .then((reviews) => { return {
      reviews
    }})
};

const seedBooks = (m) => {
  return Promise.all([
    m.Book.create({
      publication_date: new Date(1949, 6, 8),
      title: '1984',
      picture: '1984.jpg',
      abstract: 'Hidden away in the Record Department of the sprawling Ministry of Truth, Winston Smith skilfully ' +
        'rewrites the past to suit the needs of the Party. Yet he inwardly rebels against the totalitarian world he ' +
        'lives in, which demands absolute obedience and controls him through the all-seeing telescreens and ' +
        'the watchful eye of Big Brother, symbolic head of the Party. In his longing for truth and liberty, ' +
        'Smith begins a secret love affair with a fellow-worker Julia, but soon discovers the true price ' +
        'of freedom is betrayal.',
      isbn: '9780141187761',
      number_of_pages: 400,
      format: 'paper',
      is_favorite: true,
      is_bestseller: false,
      author_interview: 'In the late 1940s, George Orwell (whose real name is Eric Blair) ' +
        'wrote Nineteen Eighty-Four, ' +
        'the most chilling modern account of how things might end up if we fail to preserve our freedom. ' +
        'But Orwell himself is not pessimistic at all. In an exclusive interview with Business Software Review — ' +
        'his first in over 30 years — Orwell reveals the motives that led him to write ' +
        'Nineteen Eighty-Four, and how ' +
        'his views have changed over the last three decades. He was interviewed at his home outside Cambridge, ' +
        'England by ICP editor Scott Palmer.\n' +
        '\n' +
        'Palmer: Did you regard Nineteen Eighty-Four as a “prophetic” novel? Do you think it’s turned out that way?\n' +
        'Orwell: That question came up when the book was first published, and I’ll give you the same answer I gave ' +
        'then: the society I depict in Nineteen Eighty-Four will not necessarily come about. But allowing ' +
        'for the fact that the book is a satire, meaning that it’s an exaggeration to make a point, something ' +
        'quite like [the society it depicts] could come about. I set the story in Britain to show that ' +
        'English-speaking countries are not above happenings of this kind: that totalitarianism, if not fought ' +
        'against, can triumph anywhere. It’s a warning, not a prophecy. As for how my “prophecies” have turned ' +
        'out, I suppose that’s something on which we all keep our own scorecards. Since 1950, when I stopped ' +
        'writing, the spread of totalitarianism over the globe has accelerated. Totalitarianism is the basic ' +
        'pattern of society in many countries, yet our part of the world has not so far succumbed. The fact that ' +
        'the year 1984 is producing this interest in my book is an encouraging sign. Another entry in the ' +
        'positive column is the alarm so many people feel when technological development threatens to increase ' +
        'the power of the government over the individual. Whenever we see a government of laws assert itself over ' +
        'a government of men, we have positive grounds to hope that the society in Nineteen Eighty-Four is not ' +
        'coming. In the book, of course, there are no laws but many crimes. On the whole, I think the world of ' +
        '1984 is a little closer to the situation in the book than it was in 1950, but much less so than it ' +
        'could have been. However, the potential for a totalitarian world is large enough that ' +
        'people are worried about it.\n' +
        '\n' +
        'Palmer: In the book, you presented the great powers of the world as de facto co-conspirators in a ' +
        'plot to “busy giddy minds with foreign quarrels.” Perpetual war not only distracted the people from ' +
        'troubles at home, but provided an excuse for oppression and constant spying on the citizens. ' +
        'Do you see this happening today between the United States and the Soviet Union?\n' +
        'Orwell: There isn’t yet a conspiracy, but as far as the people of the world are concerned, there might ' +
        'as well be one. We all contribute to support an enormous military establishment: and at present, ' +
        'there’s no alternative. As imperfect as things might be in the West, they’re still vastly superior ' +
        'to those in the East. However, our defense institutions have to be constantly watched to make sure ' +
        'they don’t crush the freedoms they are supposed to protect. Your own President Eisenhower never did ' +
        'better than when he warned of the dangers in the growth of the military-industrial complex. The using of ' +
        'the world’s resources for armaments is a great totalitarian technique for the subjugation of the people.',
      price: 999,
      publishing_house: 'Penguin Classics',
    }),
    m.Book.create({
      publication_date: new Date(1952, 10, 12),
      title: 'The Old Man and the Sea',
      picture: 'old-man-sea.jpg',
      abstract: 'Set in the Gulf Stream off the coast of Havana, Hemingway\'s magnificent fable is the story of an' +
        ' old man, a young boy and a giant fish. Here, in a perfectly crafted story, is a unique and timeless vision' +
        ' of the beauty and grief of man\'s challenge to the elements in which he lives. Not a single word ' +
        'is superfluous in this widely admired masterpiece, which once and for all established his place as one ' +
        'of the giants of modern literature.',
      isbn: '0099908409',
      number_of_pages: 112,
      format: 'paper',
      is_favorite: false,
      is_bestseller: true,
      author_interview: null,
      price: 1499,
      publishing_house: 'Arrow',
    }),
    m.Book.create({
      publication_date: new Date(1980, 7, 23),
      title: 'Il Nome della Rosa',
      picture: 'nome-della-rosa.jpg',
      abstract: 'Ultima settimana del novembre 1327. Il novizio Adso da Melk accompagna in un\'abbazia dell\'alta' +
        ' Italia frate Guglielmo da Baskerville, incaricato di una sottile e imprecisa missione diplomatica. ' +
        'Ex inquisitore, amico di Guglielmo di Occam e di Marsilio da Padova, frate Guglielmo si trova a dover ' +
        'dipanare una serie di misteriosi delitti (sette in sette giorni, perpetrati nel chiuso della ' +
        'cinta abbaziale) che insanguinano una biblioteca labirintica e inaccessibile. Per risolvere il caso, ' +
        'Guglielmo dovrà decifrare indizi di ogni genere, dal comportamento dei santi a quello degli eretici, ' +
        'dalle scritture negromantiche al linguaggio delle erbe, da manoscritti in lingue ignote alle mosse ' +
        'diplomatiche degli uomini di potere. La soluzione arriverà, forse troppo tardi, in termini di giorni, ' +
        'forse troppo presto, in termini di secoli.',
      isbn: '0099908409',
      number_of_pages: 624,
      format: 'digital',
      is_favorite: false,
      is_bestseller: false,
      author_interview: null,
      price: 1050,
      publishing_house: 'Bompiani',
    }),
    m.Book.create({
      publication_date: new Date(1989, 3, 1),
      title: 'The Pillars of the Earth',
      picture: 'pillars-of-earth.jpg',
      abstract: 'The Pillars of the Earth is a historical novel by Welsh author Ken Follett published in 1989 about ' +
        'the building of a cathedral in the fictional town of Kingsbridge, England. It is set in the middle ' +
        'of the 12th century, primarily during the Anarchy, between the time of the sinking of the White Ship ' +
        'and the murder of Thomas Becket. The book traces the development of Gothic architecture out of the ' +
        'preceding Romanesque architecture, and the fortunes of the Kingsbridge priory and village against ' +
        'the backdrop of historical events of the time.',
      isbn: '9781509848492',
      number_of_pages: 1104,
      format: 'digital',
      is_favorite: false,
      is_bestseller: false,
      author_interview: null,
      price: 2070,
      publishing_house: 'Pan',
    }),
    m.Book.create({
      publication_date: new Date(1904, 11, 11),
      title: 'Il fu Mattia Pascal',
      picture: 'mattia-pascal.jpg',
      abstract: 'Il fu Mattia Pascal, il più famoso dei romanzi pirandelliani, riveste un’importanza fondamentale ' +
        'nella letteratura italiana del Novecento. Grottesco antieroe, Mattia Pascal è uomo senza certezze e ' +
        'senza vocazioni. Creduto morto dopo una fuga da casa, pensa di approfittarne per cambiare vita, ma il ' +
        'desiderio di spezzare le catene delle convenzioni sociali, lo slancio verso la riconquista di ' +
        'un’originaria purezza e autenticità falliscono: perché la vita deve comunque darsi una forma, ' +
        'e la fatica che bisogna affrontare per crearne una nuova è talora così grande che ci ' +
        'costringe a rientrare precipitosamente nella vecchia. La quale, pur con i suoi originari limiti ' +
        'e le sue falsità, rende possibile l’esistenza, allontanando il rischio della disgregazione, ' +
        'impedendoci di essere altro da noi, inchiodandoci a una realtà fittizia, ma inalienabile. ',
      isbn: '8854165387',
      number_of_pages: 212,
      format: 'paper',
      is_favorite: true,
      is_bestseller: true,
      author_interview: null,
      price: 390,
      publishing_house: 'Newton Compton',
    }),
    m.Book.create({
      publication_date: new Date(2009, 6, 31),
      title: 'Introduction to Algorithms',
      picture: 'algorithms.jpg',
      abstract: 'Some books on algorithms are rigorous but incomplete; others cover masses of material but lack ' +
        'rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers ' +
        'a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels ' +
        'of readers. Each chapter is relatively self-contained and can be used as a unit of study. ' +
        'The algorithms are described in English and in a pseudocode designed to be readable by anyone who has ' +
        'done a little programming. The explanations have been kept elementary without sacrificing depth ' +
        'of coverage or mathematical rigor.',
      isbn: '9780262033848',
      number_of_pages: 1320,
      format: 'paper',
      is_favorite: false,
      is_bestseller: true,
      author_interview: null,
      price: 8910,
      publishing_house: 'The MIT Press',
    }),
  ])
    .then(([
      book_1984,
      book_oldmansea,
      book_nomerosa,
      book_pillars,
      book_mattiapascal,
      book_algorithms,
           ]) => { return {
      book_1984,
      book_oldmansea,
      book_nomerosa,
      book_pillars,
      book_mattiapascal,
      book_algorithms,
    }})
};

const loremIpsumForEvent = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet erat nunc. Etiam' +
  ' eu vestibulum ante, vitae vehicula lectus. Ut finibus fermentum diam eu commodo. Pellentesque turpis ' +
  'magna, cursus nec magna eu, tempor pulvinar nisl. Nam cursus semper turpis hendrerit tempus. ' +
  'Vestibulum pharetra nulla tortor, non ornare lectus condimentum.  Lorem ipsum dolor sit amet, consectetur ' +
  'adipiscing elit. Sed sit amet erat nunc. Etiam eu vestibulum ante, vitae vehicula lectus. Ut finibus ' +
  'fermentum diam eu commodo. Pellentesque turpis magna, cursus nec magna eu, tempor pulvinar nisl. Nam ' +
  'cursus semper turpis hendrerit tempus. Vestibulum pharetra nulla tortor, non ornare lectus condimentum. ';
const seedEvents = (m) => {
  return Promise.all([
    m.Event.create({
      date: new Date(Date.UTC(2019, 6, 4, 12)),
      name: 'Nineteen Eighty-Four: are we living in a dystopian society?',
      description: 'A rant about current police-state nations.',
      picture: '1984_e1.jpg',
    }),
    m.Event.create({
      date: new Date(Date.UTC(2019, 2, 13, 10)),
      name: 'The Orwellian Catastrophe: Is Privacy Really Threatened?',
      description: loremIpsumForEvent,
      picture: '1984_e2.jpg',
    }),
    m.Event.create({
      date: new Date(Date.UTC(2019, 10, 28, 12)),
      name: 'Applying the Old Man and the Sea\'s lessons to you daily life',
      description: loremIpsumForEvent,
      picture: 'old-man-sea_e1.jpg',
    }),
    m.Event.create({
      date: new Date(Date.UTC(2019, 8, 12, 15)),
      name: 'The Pillars of our contemporary life',
      description: loremIpsumForEvent,
      picture: 'pillars-of-earth_e1.jpg',
    }),
  ])
    .then(([
      event_1984_e1,
      event_1984_e2,
      event_oldmansea_e1,
      event_pillars_e1,
           ]) => { return {
      event_1984_e1,
      event_1984_e2,
      event_oldmansea_e1,
      event_pillars_e1,
    }})
};

module.exports = seed = (m) => {
  return Promise.all([
    seedUsers(m),
    seedGenres(m),
    seedAuthors(m),
    seedThemes(m),
    seedReviews(m),
    seedBooks(m),
    seedEvents(m),
  ])
    .then(([
      users,
      genres,
      authors,
      themes,
      reviews,
      books,
      events,
           ]) => {
      return Promise.all([
        users.user_leonardo.addBook(books.book_1984, {
          through: {
            quantity: 1,
          }
        }),
        users.user_leonardo.addBook(books.book_mattiapascal, {
          through: {
            quantity: 1,
          }
        }),
        users.user_leonardo.addBook(books.book_oldmansea, {
          through: {
            quantity: 1,
          }
        }),

        users.user_admin.addBook(books.book_oldmansea, {
          through: {
            quantity: 1,
          }
        }),

        books.book_1984.setGenre(genres.genre_dystopia),
        books.book_1984.addAuthor(authors.author_orwell),
        books.book_1984.addThemes([themes.theme_love, themes.theme_justice, themes.theme_war]),
        events.event_1984_e1.setBook(books.book_1984),
        events.event_1984_e2.setBook(books.book_1984),
        reviews.reviews[0].setBook(books.book_1984),
        reviews.reviews[0].setUser(users.user_leonardo),
        reviews.reviews[1].setBook(books.book_1984),
        reviews.reviews[1].setUser(users.user_admin),

        books.book_nomerosa.setGenre(genres.genre_novel),
        books.book_nomerosa.addAuthor(authors.author_eco),
        books.book_nomerosa.addThemes([themes.theme_love, themes.theme_justice]),
        books.book_nomerosa.addBook1(books.book_1984),
        reviews.reviews[2].setBook(books.book_nomerosa),
        reviews.reviews[2].setUser(users.user_gianni),

        books.book_mattiapascal.setGenre(genres.genre_novel),
        books.book_mattiapascal.addAuthor(authors.author_pirandello),
        books.book_mattiapascal.addThemes([themes.theme_love, themes.theme_friendship, themes.theme_death]),
        books.book_nomerosa.addBook1(books.book_oldmansea),
        reviews.reviews[3].setBook(books.book_mattiapascal),
        reviews.reviews[3].setUser(users.user_laura),
        reviews.reviews[4].setBook(books.book_mattiapascal),
        reviews.reviews[4].setUser(users.user_leonardo),

        books.book_oldmansea.setGenre(genres.genre_novel),
        books.book_oldmansea.addAuthor(authors.author_hemingway),
        books.book_oldmansea.addThemes([themes.theme_friendship, themes.theme_peace]),
        events.event_oldmansea_e1.setBook(books.book_oldmansea),
        reviews.reviews[5].setBook(books.book_oldmansea),
        reviews.reviews[5].setUser(users.user_admin),
        reviews.reviews[6].setBook(books.book_oldmansea),
        reviews.reviews[6].setUser(users.user_gianni),

        books.book_pillars.setGenre(genres.genre_thriller),
        books.book_pillars.addAuthor(authors.author_follett),
        books.book_pillars.addThemes([themes.theme_friendship, themes.theme_love]),
        books.book_nomerosa.addBook1(books.book_nomerosa),
        events.event_pillars_e1.setBook(books.book_pillars),
        reviews.reviews[7].setBook(books.book_pillars),
        reviews.reviews[7].setUser(users.user_laura),

        books.book_algorithms.setGenre(genres.genre_essay),
        books.book_algorithms.addAuthors([authors.author_cormen, authors.author_leiserson]),
        books.book_algorithms.addThemes([themes.theme_science]),
        reviews.reviews[8].setBook(books.book_algorithms),
        reviews.reviews[8].setUser(users.user_leonardo),
        reviews.reviews[9].setBook(books.book_algorithms),
        reviews.reviews[9].setUser(users.user_gianni),
      ])
    })
    .catch(error => console.log(error));
};
