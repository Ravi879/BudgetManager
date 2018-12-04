 <?php
require("UserDatabase.php");

    if(isset($_POST['type']) && isset($_POST['val'])){
        $key = $_POST['type'];
        $val = $_POST['val'];
        
        $db = new UserDatabase();

        if($db->initDatabase()){
            if($db->isExists($key, $val)){
                echo -1;
            }
            else{
                echo 1;
            }
        }
    }

    if(isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password'])){
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $db = new UserDatabase();

        if($db->initDatabase()){
            $db->isExists("username",$username);

            $ary = $db->createUser($username, $email, $password);
        
            if(array_key_exists("message",$ary)){
                echo $ary["message"];
                exit();
            }
        
            if($ary['err'] === NULL && intval($ary['ok']) === 1){
                echo "ok";
            }else{
                echo "Error : " . $ary['err'];
            }
        }else{
            echo "Database initialization failed";
        }

    }

?>
