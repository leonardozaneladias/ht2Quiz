import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

    constructor(private sqlite: SQLite) {
    }

    public getDB() {
        return this.sqlite.create({
            name: 'quiz.db',
            location: 'default'
        });
    }

    public createDatabase() {
        return this.getDB()
            .then((db: SQLiteObject) => {

                // Criando as tabelas
                this.createTables(db);

                // Inserindo dados padrão
                this.insertDefaultItems(db);

            })
            .catch(e => console.log(e));
    }

    private createTables(db: SQLiteObject) {
        // Criando as tabelas
        db.sqlBatch([
            ['CREATE TABLE IF NOT EXISTS "participants" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"name" TEXT,"email" TEXT,"phone" TEXT,"ranking" INTEGER,"created" TEXT)'],
            ['CREATE TABLE IF NOT EXISTS "questions" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"question" TEXT,"difficulty" INTEGER,"correct_alternative" TEXT,"section" INTEGER)'],
            ['CREATE TABLE IF NOT EXISTS "answers" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"question_id" INTEGER,"alternative" TEXT,"answer" TEXT,CONSTRAINT "fk_answers_questions_1" FOREIGN KEY ("question_id") REFERENCES "questions" ("id"))']
        ])
            .then(() => console.log('Tabelas criadas'))
            .catch(e => console.error('Erro ao criar as tabelas', e));
    }

    private insertDefaultItems(db: SQLiteObject) {
        db.executeSql('SELECT COUNT(id) as qtd FROM questions', {})
            .then((data: any) => {
                //Se não existe nenhum registro
                if (data.rows.item(0).qtd <= 0) {

                    // Criando as tabelas
                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [1,'Em que ano a Cerveja Skol chegou ao Brasil?', '10', 'A', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [1,'1967','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [1,'1958','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [1,'1969','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [1,'1973','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [2,'Quais as inovações que partiram da Cerveja Skol? ', '10', 'A', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [2,'Primeira Lata de Alumínio, Primeira Long Neck, Primeira Lata com abertura redonda, Primeira Lata de 500ml','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [2,'Primeira Lata de Titânio, Primeira garrafa de 1,5L, Primeira Lata com abertura quadrada, Primeira Lata de 500ml','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [2,'Primeira Lata de Alumínio, Primeira Cerveja do Brasil, Primeira Lata com abertura redonda, Primeira Lata de 500ml','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [2,'Eu só sei que é tanta inovação que, quem viveu viu e quem viver, verão','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [3,'A cerveja Skol tem como característica ser:', '5', 'D', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [3,'jovem, atual e careta','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [3,'tradicional, jovem e amarga','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [3,'conservadora, quadrada e amarga','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [3,'redonda, inovadora e irreverente ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [4,'De onde vem o nome Skol?', '10', 'B', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [4,'De onde vem o nome Skol?','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [4,'do Escandinavo “Skal”, que significa à vossa/ nossa saúde','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [4,'do ritmo Jamaicano “Ska”','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [4,'do Português, “Escol”, aquilo que pode ser considerado como o melhor ou mais relevante','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [5,'O termo “cerveja” vem:', '10', 'B', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [5,'da palavra Cereal','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [5,'da palavra “cerevisia”, homenagem à Deusa Ceres da agricultura e fertilidade','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [5,'da combinação de cevada com cereja, a primeira fórmula da bebida','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [5,'combinação ortográfica de “ser” e “veja” quando a bebida foi traduzida pro português','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [6,'Qual o nome da Ciência dedicada ao estudo da cerveja?', 5, 'B', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [6,'Mitologia','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [6,'Zitologia ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [6,'Enologia','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [6,'Ecologia ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [7,'Na antiguidade a produção de cerveja era uma produção exclusiva das mulheres, conhecidas como:', 5, 'A', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [7,'Alewife','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [7,'She-Ra ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [7,'The Good Wife','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [7,'Wonder Woman ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [8,'Qual principal ingrediente responsável pelo nível de amargor (IBU) da cerveja?', 5, 'C', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [8,'Cana-de-açúcar','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [8,'Água ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [8,'Lúpulo','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [8,'Ressaca braba ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [9,'Quem é considerado pela Igreja Católica como o Padroeiro dos Cervejeiros?', 5, 'D', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [9,'Zeca Pagodinho','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [9,'São Francisco de Assis ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [9,'Seu Jorge','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [9,'Santo Agostinho ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [10,'A cerveja mais forte do Mundo tem 67,5% de álcool e chama-se:', '10', 'C', 1]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [10,'Scorpion Venom','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [10,'Angry Bull ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [10,'Snake Venom','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [10,'Black Panther  ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [11,'Onde e quando se originou o Carnaval?', '10', 'D', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [11,'Na França no Século 19','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [11,'No Brasil nos anos 40','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [11,'Em Veneza na Italia, no século 18','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [11,'Na Grécia em meados dos anos 600 a 520 AC','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [12,'Depois no nosso imbatível Carnaval, qual é a cidade que faz o segundo maior carnaval do mundo? ', '10', 'A', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [12,'Londres','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [12,'Cidade do México ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [12,'Veneza ','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [12,'Nova Orleans','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [13,'O Bloco Vou de Táxi desfilou pela primeira vez em:', '10', 'B', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [13,'2012','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [13,'2014','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [13,'2015','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [13,'1990','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [14,'Para saber quando cai a quarta-feira de cinzas, retrocede-se quantos dias da Páscoa?', '10', 'C', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [14,'40','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [14,'36','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [14,'46','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [14,'1','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [15,'Qual marchinha é considerada a primeira escrita para um bloco de Carnaval?', '10', 'B', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [15,'“Se você fosse sincera, ô ô Ô ô, Aurora”','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [15,'“Ó abre alas que eu quero passar”','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [15,'“Ahllah lá ô ô ô ô ô ô ô, mas que calor ô ô ô ô Ô ô”','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [15,'“Ei, você aí, me dá um dinheiro aí, me dá um dinheiro aí”','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [16,'O primeiro Bloco de Carnaval do Brasil (Rio de Janeiro), fundado em 1855, foi o:', '5', 'B', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [16,'Nóis trupica mas não cai','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [16,'Congresso das Sumidades Carnavalescas','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [16,'Confraria do Bola Preta','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [16,'Segura o Tchan','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [17,'Qual escritor famoso foi um dos primeiros fundadores do primeiro Bloco de Carnaval no Brasil? ', '5', 'A', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [17,'José de Alencar','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [17,'Milton Nascimento ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [17,'Jorge Bem Jor','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [17,'Zé da Recaída ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [18,'As sombrinhas de Frevo é um dos principais símbolos do carnaval de: ', '5', 'B', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [18,'Barretos','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [18,'Recife','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [18,'Goiânia ','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [18,'Moocalor, mêo na Moóca','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [19,'Os bonecos gigantes são um dos principais símbolos do carnaval de qual destes lugares? ', '5', 'D', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [19,'Piracicaba','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [19,'Itú','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [19,'Disneylândia ','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [19,'Olinda ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [20,'Desde 1995 é considerado o maior Bloco de carnaval do Mundo, segundo o Guinness:', '5', 'C', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [20,'Bloco Simpatia é quase Amor ','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [20,'Bloco de 20 ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [20,'Bloco Galo da Madrugada','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [20,'Bloco Avião sem asa ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [21,'Em São Paulo, qual escola de Samba possui mais títulos de Campeã? ', '10', 'A', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [21,'Vai-Vai','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [21,'Gaviões da Fiel','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [21,'São Clemente','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [21,'Portela ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [22,'Em qual ano foi lançada a música “Vou de Táxi”, interpretada por Angélica:', '5', 'C', 2]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [22,'1984','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [22,'2014','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [22,'1988','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [22,'Vixi, o ano eu não sei, mas eu tava morrendo de saudade','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [23,'Quantas noites de amor o cantor Netinho eternizou com a música Milla? ', '5', 'A', 3]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [23,'1001','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [23,'1000  ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [23,' 1 ','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [23,'1011','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [24,'“O Araketu, o Araketu quando toca, deixa todo mundo”:', '5', 'B', 3]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [24,'cantando a mesma nota','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [24,'pulando que nem pipoca ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [24,'esquentando que nem pipoca','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [24,'invertendo o troca-troca','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [25,'Complete a frase: “quer andar de carro velho amor, que venha, pois eu sei que…', '10', 'A', 3]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [25,'amar a pé amor, é lenha','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [25,'andar a pé amor, é lenha ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [25,'cê não quer amor, entenda','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [25,'é óbvio que o amor não quer andar de carro velho… pra que gente? ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [26,'O hino eternizado Brasília Amarela, dos Mamonas Assassinas, cita quantas comidas?', '10', 'C', 3]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [26,'5','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [26,'4 ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [26,'3','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [26,'8','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [27,'Quantos TIQUI’S tem no refrão “bate forte o tambor, eu quero é…”', '5', 'A', 3]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [27,'4','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [27,'5 ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [27,'10','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [27,'π x r²','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [28,'Qual o nome verdadeiro do Compadre Washington (ordinááááária)?', '10', 'B', 4]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [28,'Alberto Jamaica Jr.','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [28,'Washington Luiz Silva Santos ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [28,'Washington Luiz Pereira de Souza','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [28,'Não sei de nada, inocente ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [29,'Qual dupla sertaneja raiz tem um dos componentes com o nome de Mirosmar?', '5', 'C', 4]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [29,'Caipira e Caipóra','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [29,'Tonico e Tinoco ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [29,'Zezé de Camargo e Luciano','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [29,'E.T e Rodolfo, opa, pera… nem é sertanejo kkk','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [30,'Pra quem não sabe, o eterno Mr. Catra lançou seu primeiro CD em 1994. Quantos filhos ele tem? ', '10', 'C', 4]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [30,'17','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [30,'24 ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [30,'32','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [30,'Nunca se sabe, até eu posso ser filho (a) dele! ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [31,'O icônico programa Fantasia, do SBT, estreou em que ano na TV brasileira?', '10', 'A', 4]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [31,'1997','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [31,'1992 ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [31,'1990','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [31,'O ano não sei, mas que sinto saudades…','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [32,'O clássico “Esqueceram de mim” dos anos 90 era protagonizado por um menino que hoje virou até meme. Qual é o nome correto dele?', '5', 'B', 4]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [32,'Mack Laren Calkin','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [32,'Macaulay Culkin ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [32,'Mackaulin Kcaukyn','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [32,'Mac Aulyin Callkyn','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [35,'O saudoso bichinho-virtual marcou os anos 90. Qual era o nome correto dele?', '10', 'C', 5]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [35,'Tamagoshi','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [35,'Tamma Goshy ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [35,'Tamagotchi','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [35,'Não sei mas já quero ','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [36,'Qual foi o filme de maior bilheteria da nossa amada década de 90?', '5', 'D', 5]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [36,'Jurassic Park - Parque dos Dinossauros - 1993','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [36,'Forrest Gump - 1994 ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [36,'Ghost - 1990','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [36,'Titanic - 1997','D']);

                    db.executeSql('insert into questions (id,question,difficulty,correct_alternative,section) values (?,?,?,?,?)', [38,'No seriado “A Família Dinossauros”, sucesso no início da década de 90, qual eram os bordões usados personagem Baby? ', '5', 'C', 5]);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [38,'“Mamãe eu quero” / “Mamãe eu quero mamar” / “Dá a chupeta, dá a chupetaaa”','A']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [38,'“Vem cá mamãe” / “Me dá um abraço?” / “Tô com fome, tô com fomeee” ','B']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [38,'“Não é a mamãe” / “Você tem que me amar” / “De novo, de novoooo”','C']);
                    db.executeSql('insert into answers (question_id,answer,alternative) values (?,?,?)', [38,'Cara, cê tá me zoando, desce logo uma Skol, de novo, de novooo','D']);







                }
            })
            .catch(e => console.error('Erro ao consultar a qtd de questions', e));
    }

}
