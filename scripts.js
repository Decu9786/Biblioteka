var Tablica = [];
function wypisz_czytelnika()
{
	var x = location.search;
	x = x.substr(1);
	myStorage = window.localStorage;
	Czytelnicy = JSON.parse(localStorage.getItem('ListaCzytelnikow'));
	Ksiazki = JSON.parse(localStorage.getItem('ListaKsiazek'));
	var Czytelnik = Czytelnicy[x].imie + " " + Czytelnicy[x].nazwisko + " " + Czytelnicy[x].pesel;
	var nowy_div = document.createElement("div");
	nowy_div.innerHTML = Czytelnik;
	document.getElementById("idczytelnika").appendChild(nowy_div);
	for (var i = 0 ; i < Czytelnicy[x].lista.length ; i++)
	{
		var numer = Czytelnicy[x].lista[i];
		if(numer == -1)
			continue ;
		Tablica[i] = numer;
		var Autor = Ksiazki[numer].autor;
		var Tytul = Ksiazki[numer].tytul;
		var ksiazka = Autor + " - ,," + Tytul + "''";
		var nowy_div = document.createElement("div");
		nowy_div.innerHTML = ksiazka;
		nowy_div.setAttribute("id",i);
		document.getElementById("lista_ksiazek").appendChild(nowy_div);
		var button_zwroc = document.createElement("button");
		button_zwroc.innerHTML = "ZWROC";
		document.getElementById(i).appendChild(button_zwroc);
		button_zwroc.setAttribute("id",i);
		button_zwroc.setAttribute("onclick",'elooo(this.id)');
	}
}
function elooo(numer)
{
	var x = location.search;
	x = x.substr(1);
	myStorage = window.localStorage;
	Czytelnicy = JSON.parse(localStorage.getItem('ListaCzytelnikow'));
	Czytelnicy[x].lista[numer] = -1;
	localStorage.setItem('ListaCzytelnikow',JSON.stringify(Czytelnicy));
	Ksiazki = JSON.parse(localStorage.getItem('ListaKsiazek'));
	Ksiazki[Tablica[numer]].ilosc++;
	localStorage.setItem('ListaKsiazek',JSON.stringify(Ksiazki));
	location.href = "ReaderList.html";
}
function Edit_czytelnika(numer)
{
	var link = "ReaderEdit.html?";
	link = link + numer;
	location.href = link;
}
function Info_czytelnika(numer)
{
	var link = "ReaderShow.html?";
	link = link + numer;
	location.href = link;
}
function pokaz_czytelnikow()
{
	var div = document.getElementById('czytelnicy');
	while(div.firstChild)
	{
		div.removeChild(div.firstChild);
	}
	var slowo = document.getElementById("wejscie").value;
	sprawdzz = JSON.parse(localStorage.getItem('ListaCzytelnikow'));
	if(sprawdzz === null)
	{
		alert("PUSTY");
		return;
	}
	for (var i = 0 ; i < sprawdzz.length ; i++)
	{
		var Imie = sprawdzz[i].imie;
		var Nazwisko = sprawdzz[i].nazwisko;
		var Pesel = sprawdzz[i].pesel;
		var Id = sprawdzz[i].id;
		if(Imie.includes(slowo) == true || Nazwisko.includes(slowo) == true || Pesel.includes(slowo) == true)
		{
			var nowy_div = document.createElement("div");
			nowy_div.innerHTML = Imie + " " + Nazwisko + " " + Pesel;
			document.getElementById("czytelnicy").appendChild(nowy_div);
						
			var buttonedit = document.createElement("button");
			buttonedit.innerHTML = "EDYTUJ";
			buttonedit.setAttribute("id",Id);
			buttonedit.setAttribute("onclick",'Edit_czytelnika(this.id)');
			document.getElementById("czytelnicy").appendChild(buttonedit);
						
			var buttoninfo = document.createElement("button");
			buttoninfo.innerHTML = "POKAZ";
			buttoninfo.setAttribute("id",Id);
			buttoninfo.setAttribute("onclick",'Info_czytelnika(this.id)');
			document.getElementById("czytelnicy").appendChild(buttoninfo);
		}
	}
}
function sprawdz_czytelnika()
{
	var Imie = document.getElementById("imie").value;
	var Nazwisko = document.getElementById("nazwisko").value;
	var Pesel = document.getElementById("pesel").value;
	var id = location.search;
	id = id.substr(1);
	if(Imie == "" || Nazwisko =="" || Pesel =="")
	{
		alert("Wprowadz poprawne dane!");
		return ;
	}
	edytuj_czytelnika(Imie,Nazwisko,Pesel,id);
}
function edytuj_czytelnika(Imie,Nazwisko,Pesel,id)
{
	Czytelnicy = JSON.parse(localStorage.getItem('ListaCzytelnikow'));
	var ListaKsiazek = Czytelnicy[id].lista;
	var Czytelnik = {imie: Imie, nazwisko: Nazwisko, pesel: Pesel,id:id,lista: ListaKsiazek};
	Czytelnicy[id] = Czytelnik;
	localStorage.setItem('ListaCzytelnikow',JSON.stringify(Czytelnicy));
	location.href = "ReaderList.html";
}
function sprawdz_dane_czytelnika()
{
	var Imie = document.getElementById("ImieCzytelnika").value;
	var Nazwisko = document.getElementById("NazwiskoCzytelnika").value;
	var Pesel = document.getElementById("PeselCzytelnika").value;
	if(Imie == "" || Nazwisko =="" || Pesel =="")
	{
		alert("Wprowadz poprawne dane!");
		return ;
	}
	dodaj_czytelnika(Imie,Nazwisko,Pesel);
}
function dodaj_czytelnika(Imie,Nazwisko,Pesel)
{
	ListaCzytelnikow = JSON.parse(localStorage.getItem('ListaCzytelnikow'));
	if(ListaCzytelnikow === null)
	{
		var ListaKsiazek =[];
		var Czytelnik = {imie: Imie, nazwisko: Nazwisko, pesel: Pesel, id:0, lista:ListaKsiazek};
		Czytelnicy = [];
		Czytelnicy.push(Czytelnik);	
		localStorage.setItem('ListaCzytelnikow',JSON.stringify(Czytelnicy));
	}
	else
	{
		var ListaKsiazek =[];
		var Czytelnik = {imie: Imie, nazwisko: Nazwisko, pesel: Pesel,id:ListaCzytelnikow.length,lista:ListaKsiazek};
		ListaCzytelnikow = JSON.parse(localStorage.getItem('ListaCzytelnikow'));
		ListaCzytelnikow.push(Czytelnik);
		localStorage.setItem('ListaCzytelnikow',JSON.stringify(ListaCzytelnikow));
	}
	var div = document.getElementById("DODANO");
	div.innerHTML = "Dodano czytelnika: " + Imie + " " + Nazwisko + " " + Pesel;
}
function pokaz_czytelnikow_wypozycz()
{
	var div = document.getElementById('czytelnicy');
	while(div.firstChild)
	{
		div.removeChild(div.firstChild);
	}
	var slowo = document.getElementById("wejscie").value;
	sprawdzz = JSON.parse(localStorage.getItem('ListaCzytelnikow'));
	if(sprawdzz === null)
	{
		return;
	}
	for (var i = 0 ; i < sprawdzz.length ; i++)
	{
		var Imie = sprawdzz[i].imie;
		var Nazwisko = sprawdzz[i].nazwisko;
		var Pesel = sprawdzz[i].pesel;
		var Id = sprawdzz[i].id;
		if(Imie.includes(slowo) == true || Nazwisko.includes(slowo) == true || Pesel.includes(slowo) == true)
		{
			var nowy_div = document.createElement("div");
			nowy_div.innerHTML = Imie + " " + Nazwisko + " " +Pesel;
			document.getElementById("czytelnicy").appendChild(nowy_div);
						
			var buttongive = document.createElement("button");
			buttongive.innerHTML = "WYPOZYCZ";
			buttongive.setAttribute("id",Id);
			buttongive.setAttribute("onclick",'Wypozycz(this.id)');
			document.getElementById("czytelnicy").appendChild(buttongive);			
		}
	}
}
function Wypozycz(numer)
{
	var x = location.search;
	x = x.substr(1);
	//dla goscia z id numer musimy wporzyczys ksiazke z id x
	var Czytelnicy = JSON.parse(localStorage.getItem('ListaCzytelnikow'));
	var List = Czytelnicy[numer].lista;
	List.push(x);
	Czytelnicy[numer].lista = List;
	localStorage.setItem('ListaCzytelnikow',JSON.stringify(Czytelnicy));
	var Ksiazki = JSON.parse(localStorage.getItem('ListaKsiazek'));
	Ksiazki[x].ilosc = Ksiazki[x].ilosc - 1;
	localStorage.setItem('ListaKsiazek',JSON.stringify(Ksiazki));
	location.href = "BookList.html";
}
function pokaz_ksiazki()
{
	var slowo = document.getElementById("wejscie").value;
	var div = document.getElementById("ksiazki");
	while(div.firstChild)
	{
		div.removeChild(div.firstChild);
	}
	sprawdzz = JSON.parse(localStorage.getItem('ListaKsiazek'));
	if(sprawdzz === null)
	{
		return;
	}
	for (var i = 0 ; i < sprawdzz.length ; i++)
	{
		var Autor = sprawdzz[i].autor;
		var Tytul = sprawdzz[i].tytul;
		var Ilosc = sprawdzz[i].ilosc;
		var Idks = sprawdzz[i].id;
		if(Autor.includes(slowo) == true || Tytul.includes(slowo) == true)
		{
			var nowy_div = document.createElement("div");
			nowy_div.innerHTML = Autor + ": ,," + Tytul + "''  - " + Ilosc;
			document.getElementById("ksiazki").appendChild(nowy_div);
						
			var buttonedit = document.createElement("button");
			buttonedit.innerHTML = "EDYTUJ";
			buttonedit.setAttribute("id",Idks);
			buttonedit.setAttribute("onclick",'Edit_ksiazka(this.id)');
			document.getElementById("ksiazki").appendChild(buttonedit);
						
			if(Ilosc > 0)
			{
				var buttoninfo = document.createElement("button");
				buttoninfo.innerHTML = "WYPOZYCZ";
				buttoninfo.setAttribute("id",Idks);
				buttoninfo.setAttribute("onclick",'Info_ksiazka(this.id)');
				document.getElementById("ksiazki").appendChild(buttoninfo);
			}
		}
	}
}
function Edit_ksiazka(numer)
{
	var link = "BookEdit.html?";
	link = link + numer;
	location.href = link;
}
function Info_ksiazka(numer)
{
	var link = "BookTake.html?";
	link = link + numer;
	location.href = link;
}
function sprawdz_ksiazke()
{
	var Autor = document.getElementById("autor").value;
	var Tytul = document.getElementById("tytul").value;
	var Ilosc = document.getElementById("ilosc").value;
	if(Autor == "" || Tytul =="" || Ilosc ==""|| Ilosc <= 0)
	{
		alert("Wprowadz poprawne dane!");
		return ;
	}
	edytuj_ksiazke(Autor,Tytul,Ilosc);
}
function edytuj_ksiazke(Autor,Tytul,Ilosc)
{
	sprawdzz = JSON.parse(localStorage.getItem('ListaKsiazek'));
	var x = location.search;
	x = x.substr(1);
	var Ksiazka = {autor: Autor, tytul: Tytul, ilosc: Ilosc,id:x};
	Ksiazki = JSON.parse(localStorage.getItem('ListaKsiazek'));
	Ksiazki[x] = Ksiazka;
	localStorage.setItem('ListaKsiazek',JSON.stringify(Ksiazki));
		location.href = "BookList.html";
}
function sprawdz_ksiazke_dodaj()
{
	var Autor = document.getElementById("autor").value;
	var Tytul = document.getElementById("tytul").value;
	var Ilosc = document.getElementById("ilosc").value;
	if(Autor == "" || Tytul =="" || Ilosc ==""|| Ilosc <= 0)
	{
		return ;
	}
	dodaj_ksiazke(Autor,Tytul,Ilosc);
}
function dodaj_ksiazke(Autor,Tytul,Ilosc)
{
	sprawdzz = JSON.parse(localStorage.getItem('ListaKsiazek'));
	if(sprawdzz === null)
	{
		var Ksiazka = {autor: Autor, tytul: Tytul, ilosc: Ilosc,id:0};
		Ksiazki = [];
		Ksiazki.push(Ksiazka);	
		localStorage.setItem('ListaKsiazek',JSON.stringify(Ksiazki));
	}
	else
	{
		var Ksiazka = {autor: Autor, tytul: Tytul, ilosc: Ilosc,id:sprawdzz.length};
		Ksiazki = JSON.parse(localStorage.getItem('ListaKsiazek'));
		Ksiazki.push(Ksiazka);
		localStorage.setItem('ListaKsiazek',JSON.stringify(Ksiazki));
	}
	var div = document.getElementById("DODANO");
	div.innerHTML = "Dodano ksiazke: " + Autor + ": ,," + Tytul + "'' " + Ilosc;
}