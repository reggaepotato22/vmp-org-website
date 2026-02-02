<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$target_dir = "../uploads/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if (!isset($_FILES["file"])) {
    http_response_code(400);
    echo json_encode(["error" => "No file uploaded"]);
    exit;
}

$file = $_FILES["file"];
$fileName = time() . "_" . basename($file["name"]);
$target_file = $target_dir . $fileName;
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
$check = getimagesize($file["tmp_name"]);
if ($check === false) {
    http_response_code(400);
    echo json_encode(["error" => "File is not an image."]);
    exit;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" && $imageFileType != "webp" ) {
    http_response_code(400);
    echo json_encode(["error" => "Sorry, only JPG, JPEG, PNG, GIF, & WEBP files are allowed."]);
    exit;
}

if (move_uploaded_file($file["tmp_name"], $target_file)) {
    // Return the public URL
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $domain = $_SERVER['HTTP_HOST'];
    // Adjust path if needed based on where this script is relative to root
    // Script is in /api/, uploads are in /uploads/
    // So URL should be /uploads/filename
    $publicUrl = "/uploads/" . $fileName;
    
    echo json_encode(["success" => true, "url" => $publicUrl]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
}
?>
