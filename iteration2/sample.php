
<?php

$conn = new mysqli("waste.cdylivsvnwen.us-east-2.rds.amazonaws.com","jeyganesh","jeyganesh","jeyganesh");
if($conn->connect_error) {
  exit('Could not connect');
}

$sql = "SELECT name from sample";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

<h3>"Is this recyclable?"</h3>;
<img src="<?=$row["name"]?>" width="175" height="200" />;

?>

