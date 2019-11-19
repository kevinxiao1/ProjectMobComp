<?php 
    session_start();
    function connect(){
        $conn = new mysqli("localhost","root","","mcproject");
        if($conn->connect_errno){
            die("Connection Failed <br>" . $conn->connect_error);
        }
        return $conn;
    }

    function executeNonQuery($query){ // insert update delete
        $conn = connect();
        $conn->query($query);
    }
    
    function executeNonQueryMulti($queries){ // insert update delete
        foreach (explode(";", $queries) as $iQuery => $query) {
            $conn = connect();
            $conn->query($query);            
        }
    }

    function executeQuery($query){ // select
        $conn = connect();
        $data = $conn->query($query);
        return $data->fetch_all(MYSQLI_ASSOC);
    }
    
    function executeQueryMulti($queries){ // select
        $datas = [];
        foreach (explode(";", $queries) as $iQuery => $query) {
            $conn = connect();
            $data = $conn->query($query);
            $datas[] = $data->fetch_all(MYSQLI_ASSOC);
        }
        return $datas;
    }
    function executeScalar($query){
        $conn = connect();
        $data = $conn->query($query);
        return $data->fetch_all(MYSQLI_ASSOC)[0];
    }

?>