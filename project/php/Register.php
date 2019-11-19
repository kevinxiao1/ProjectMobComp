<?php
 header("Access-Control-Allow-Origin: *");
    $con = mysqli_connect("localhost","root","","mcproject");
	$listProduct = mysqli_fetch_all(mysqli_query($con, "SELECT * FROM USER"));
	
	if($_POST["param"] == 1){
		echo json_encode(array($listProduct[0]));
	}
	else {
		echo json_encode($listProduct);
	}
?>