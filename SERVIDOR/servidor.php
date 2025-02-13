<?php
//include("conexion.php");
$conn = Conectar2("platillafutbol", "root", "");

$datos = file_get_contents('php://input');
$objeto=json_decode($datos);

// $objeto=new stdClass();
// $objeto->servicio="listar";

if($objeto != null) {
  switch($objeto->servicio) {
    case "listar":
    	print json_encode(value: listadoJugadores());
        break;
    case "insertar":
        insertarJugadores($objeto);
		print json_encode(listadoJugadores());
        break;
    case "borrar":
        borrarJugadores($objeto->id);
		print json_encode(listadoJugadores());
        break;
	case "modificar":
		modificarJugadores($objeto);
		print json_encode(listadoJugadores());
		break;
	case "selJugadorID":
		print json_encode(selJugadorID($objeto->id));
	}
}

function listadoJugadores() {
	global $conn;
	try {
		$sc = "Select * From jugadores Order By id";
		$stm = $conn->prepare($sc);
		$stm->execute();
		return ($stm->fetchAll(PDO::FETCH_ASSOC));
	} catch(Exception $e) {
		die($e->getMessage());
	}
}

function insertarJugadores($objeto) {
	global $conn;
	try {
		$sql = "INSERT INTO jugadores(nombre, apellidos, fecha_nac, posicion, nacionalidad) VALUES (?, ?, ?, ?, ?)";	
		$conn->prepare($sql)->execute(
			array(
				$objeto->nombre,
				$objeto->apellidos,
                $objeto->fecha_nac,
                $objeto->posicion,
                $objeto->nacionalidad
				)
			);
		return true;
	} catch (Exception $e) {
			die($e->getMessage());
			return false;
	}
}

function borrarJugadores($id){
	global $conn;
	try {
		$sql = "Delete From jugadores Where ID = ?";	
		$conn->prepare($sql)->execute(array($id));
		return true;
	} catch (Exception $e) {
			die($e->getMessage());
			return false;
	}
}

function modificarJugadores($objeto) {
	global $conn;
	try {
		$sql = "UPDATE jugadores SET
							NOMBRE		= ?, 
							APELLIDOS	= ?,
                            fecha_nac   = ?,
                            posicion    = ?,
                            nacionalidad    =?
						WHERE id = ?";
		$conn->prepare($sql)->execute(
		array(
			$objeto->dni,
			$objeto->nombre, 
			$objeto->apellidos, 
			$objeto->id
			) 
		);
		return true;
	} catch (Exception $e) {
		die($e->getMessage());
		return false;
	}
}

function selJugadorID($id) {
	global $conn;
	try {
		$sc = "Select * From jugadores Where ID = ?";
		$stm = $conn->prepare($sc);
		$stm->execute(array($id));
		return ($stm->fetch(PDO::FETCH_ASSOC));
	} catch(Exception $e) {
		die($e->getMessage());
	}	
}

//conexion.php
function Conectar($bd, $usuario, $clave) {
	$conn = null;
	try {
		//  NOS CONECTAMOS (y seleccionamos la bd):
    $conn = new PDO('mysql:host=localhost;dbname='. $bd, $usuario, $clave);
	} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
	}
	return $conn;
}


function conectar2($bd, $usuario, $clave) {
  try {
      $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
      @$bd = new PDO('mysql:host=localhost;dbname='. $bd, $usuario, $clave, $opciones);
      $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //aquí le digo que voy a utilizar excepciones
      return $bd;
  } catch (PDOException $e) {
      echo("No se ha podido conectar a la base de datos. Código de error: " . $e->getMessage());
  }
}


function Consulta($conn, $sc) {
	$rs = null;
	try {
		$rs = $conn->query($sc);
	} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
	}
	return $rs;
}


?>




