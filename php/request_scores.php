<?php
require_once '../include/config.php';

/* PDO + prepared statements */
try
{
    $conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_DATABASE, DB_USER, DB_PASSWORD);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("set names utf8");
    $sql = $conn->prepare("SELECT username_scores, score_scores, difficulty_scores, country_scores, acronym_scores FROM scores GROUP BY difficulty_scores, score_scores, username_scores, country_scores");
    $sql->execute();

    // set the resulting array to associative
    $results = $sql->fetchAll(PDO::FETCH_ASSOC);
    //var_dump($results);
    //echo json_encode($results);

    echo json_encode(array_values($results));

    /*$a = array();
    $b = array();

    foreach ($results as $row) {
        $a[] = array_values($row);
    }
    foreach ($a as $column) {
            $b[] = array_values($column);
        }
    var_dump($a);
    var_dump($b);*/

    //echo json_encode($b);

    /*$results1 = $sql1->fetch(PDO::FETCH_ASSOC);
    $x = (int) $results1["max(level_exercises)"];
    $xxx = array();

    for ($i = 1; $i <= 5; $i++) {
        $sql2 = $conn->prepare("SELECT text_exercises FROM tt_exercises WHERE level_exercises = ".$i);
        $conn->exec("set names utf8");
        $sql2->execute();
        $results2 = $sql2->fetchAll(PDO::FETCH_ASSOC);
        array_push($xxx, $results2);
    }

    echo json_encode($xxx);

    $indexedOnly = array();

    foreach ($associative as $row) {
        $indexedOnly[] = array_values($row);
    }

    json_encode($indexedOnly);
    */
}
catch(PDOException $e)
{
    echo $e->getMessage();
}

$conn = null;
?>
