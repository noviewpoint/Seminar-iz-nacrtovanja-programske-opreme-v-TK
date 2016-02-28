<?php
require_once '../include/config.php';
$input = json_decode(file_get_contents('php://input'));

echo "comeone";
/* PDO + prepared statements */
try
{
    $conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_DATABASE, DB_USER, DB_PASSWORD);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("set names utf8"); // zagotovi pravilno vpisovanje sumnikov

    $sql = $conn->prepare("INSERT INTO scores (users_fk, difficulty_scores, score_scores) VALUES ((SELECT id_users FROM users WHERE username_users = :username), :difficulty, :score)");

    $sql->bindValue(':username', $input->username);
    $sql->bindValue(':difficulty', $input->difficulty);
    $sql->bindValue(':score', $input->score);

    $sql->execute();
    echo "New record created successfully";

}
catch(PDOException $e)
{
    echo $e->getMessage();
}
$conn = null;
?>
