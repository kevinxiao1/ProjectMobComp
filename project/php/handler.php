<?php 
//var_dump($_GET);
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
include("connectdb.php");
if (isset($_REQUEST["method"])) {
    echo json_encode($_REQUEST["method"]($_REQUEST["query"]));
}

function bagiKartu(){
    if (executeScalar("Select count(turn) as turn from master where turn<0")["turn"] > 0 ) {
        for ($i=1; $i <= 2; $i++) { 
            $tempKartu = executeQuery("SELECT card, jenis, nilai from decks limit 4");
            $player_id = $i;
            foreach ($tempKartu as $iKartu => $kartu) {
                $card = $kartu["card"];
                $jenis = $kartu["jenis"];
                $nilai = $kartu["nilai"];
                executeNonQuery("INSERT INTO player_card(id_player, card, jenis, nilai) VALUES($player_id,'$card','$jenis',$nilai)");        
                executeNonQuery("DELETE FROM decks WHERE card='$card'");
            }
        }
        executeNonQuery("UPDATE master set lastcard='blank', lastcardjenis='', lastcardnilai=-1, turn=1");
    }
}
