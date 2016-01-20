var newwindow;
function poptastic(gg)
{
	newwindow = window.open(gg,'name','height=600,width=350');//popout prilagojen mali igri
	if (window.focus) {newwindow.focus()}
}