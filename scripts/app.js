const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам стоит пересмотреть сериал", 0),
	new Result("Вы неплохо знаете сериал", 2),
	new Result("Вы хорошо знаете сериал", 4),
	new Result("Вы настоящий фанат", 6)
];

//Массив с вопросами
const questions = 
[
	new Question("Как зовут главного героя?", 
	[
		new Answer("Танос", 0),
		new Answer("Хван Ин Хо", 0),
		new Answer("Сон Ки Хун", 1),
		new Answer("Чо Ю-ри", 0)
	]),

	new Question("Какая форма сахарной соты самая сложная?", 
	[
		new Answer("Круг", 0),
		new Answer("Треугольник", 0),
		new Answer("Звезда", 0),
		new Answer("Зонтик", 1)
	]),

	new Question("Как называлась первая игра?", 
	[
		new Answer("Громче едешь — тише будешь", 0),
		new Answer("Тише едешь — дальше будешь", 1),
		new Answer("Сахарные соты", 0),
		new Answer("Игра в кальмара", 0)
	]),

	new Question("Настоящее имя номера 001 из первого сезона", 
	[
		new Answer("О Иль Нам", 1),
		new Answer("О Илья", 0),
		new Answer("Хван Ин Хо", 0),
		new Answer("Иван Хо Ин", 0)
	]),

	new Question("Где проводят игры?", 
	[
		new Answer("Дома у главного героя", 0),
		new Answer("На острове", 1),
		new Answer("В лесу", 0),
		new Answer("В тайной пещере", 0)
	]),

	new Question("Сколько всего игроков участвуют в испытаниях?", 
	[
		new Answer("654", 0),
		new Answer("465", 0),
		new Answer("456", 1),
		new Answer("100", 0)
	]),

    new Question("В каком году вышел 1 сезон?", 
	[
		new Answer("2020", 0),
		new Answer("2021", 1),
		new Answer("2012", 0),
		new Answer("2022", 0)
	]),

    new Question("Имя какого персонажа Чхве Су Бонг взял в качестве псевдонима?", 
	[
		new Answer("Танос", 1),
		new Answer("Железный человек", 0),
		new Answer("Человек паук", 0),
		new Answer("Капитан америка", 0)
	]),

    new Question("Сколько серий в 1 сезоне?", 
	[
		new Answer("7", 0),
		new Answer("8", 0),
		new Answer("9", 1),
		new Answer("10", 0)
	]),

    new Question("На какой платформе можно посмотреть сериал?", 
	[
		new Answer("Flexix", 0),
		new Answer("Госуслуги", 0),
		new Answer("Disney+", 0),
		new Answer("Netflix", 1)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}
