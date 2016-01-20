<?php
if (isset($_GET['d'])) {//preveri obstoj
$d=$_GET["d"];
}

if (isset($_GET['q'])) {
$q=$_GET["q"];
$solveInfo=explode("u7Kls", $q);
$name=$solveInfo[0];
$time=$solveInfo[1];
$difficulty=$solveInfo[2];
$country=$solveInfo[3];
$flag=$solveInfo[4];
$flag = strtolower($flag);
if ($difficulty == 0) {$difficulty = "easy";}
if ($difficulty == 1) {$difficulty = "normal";}
if ($difficulty == 2) {$difficulty = "hard";}
}

$connection = new mysqli("fdb13.runhosting.com","1801935_databaza","p2.,3142ZS", "1801935_databaza");//povezava brez avtentikacije
if (!$connection)
{
	die('Napaka: '.$connection->connect_error);
}

/*mysqli_select_db("databaza", $connection);//povezava v database z imenom "results"		*/

if (isset($_GET['q'])) {
		$insertSolveInfo="INSERT INTO highscores".$difficulty." (name, time, country, flag)
						VALUES ('$name', '$time', '$country', '$flag')";
		if ($connection->query($insertSolveInfo))
		{
		die('Napaka: '.$conn->error);
		}
}


if (isset($_GET['d'])) {
	$showHighscores=$connection->query("SELECT name, time, country, flag FROM highscores".$d." ORDER BY time, name");  //sortira po casu (najboljsi prvo mesto etc)
	echo "<table><tr><th>Ime</th><th>Rezultat</th><th>Država</th><th></th></tr>";
	while($row = $showHighscores->fetch_assoc())
		{
			echo "<tr><td>".$row['name']."</td><td>".$row['time']."</td><td>".$row['country']."</td><td><img src='images/flags/".strtolower($row['flag']).".png' /></td></tr>";
		}
	echo "</table>";
	}
$connection->close();
?>
