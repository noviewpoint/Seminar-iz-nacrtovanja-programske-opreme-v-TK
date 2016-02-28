<?php

    // stringi v dvojnih narekovajih no-go, ker php isce vrednosti v njih (performance hit)

    require_once '../include/class.user.php';

    // pretvori php://input v asociativni array da se kamot dostopa do keyev in vrednosti
    // php://input primeren za vse request headerje, medtem ko $_POST ni!

    parse_str(file_get_contents('php://input'), $x);
    /*
    var_dump($_POST);
    var_dump($x);
    echo ($_POST['username']);
    echo ($x['username']);
    */

    /*
    $password = '123456';
    $hashed_password = '$2y$10$BBCpJxgPa8K.iw9ZporxzuW2Lt478RPUV/JFvKRHKzJhIwGhd1tpa';
    echo 'Passworda se ujemata: ' . password_verify($password, $hashed_password) . '<br />';
    */

    echo 'Now I will register someone';
    $user->register($x['username'], $x['password'], $x['country']);

    /* PDO + prepared statements */
    /*try
    {
        $conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_DATABASE, DB_USER, DB_PASSWORD);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->exec("set names utf8");

        $sql = $conn->prepare("SELECT users.username_users, scores.difficulty_scores, scores.score_scores, countries.name_countries, countries.acronym_countries FROM scores INNER JOIN users ON users_fk = users.id_users INNER JOIN countries ON users.countries_fk = countries.id_countries ORDER BY difficulty_scores, score_scores, users.username_users, countries.name_countries");

        $sql->execute();

        // set the resulting array to associative
        $results = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
    catch(PDOException $e)
    {
        echo $e->getMessage();
    }

    $conn = null;*/
 ?>
