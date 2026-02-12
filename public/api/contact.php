<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$file = 'messages.json';

// Initialize file if not exists
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Handle GET request (Fetch messages)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $content = file_get_contents($file);
    echo $content;
    exit;
}

// Handle POST request (Send message)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    // Validation
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    $newMessage = [
        'id' => uniqid(),
        'name' => htmlspecialchars($data['name']),
        'email' => htmlspecialchars($data['email']),
        'subject' => htmlspecialchars($data['subject'] ?? 'General Inquiry'),
        'interest' => htmlspecialchars($data['interest'] ?? 'general'),
        'message' => htmlspecialchars($data['message']),
        'date' => date('Y-m-d H:i:s'),
        'read' => false
    ];

    // Read existing messages
    $currentData = json_decode(file_get_contents($file), true);
    if (!is_array($currentData)) {
        $currentData = [];
    }

    // Prepend new message
    array_unshift($currentData, $newMessage);

    // Save back to file
    if (file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT))) {
        // Send Email
        $to = "info@kenyavetsmission.org";
        $subject = "New Contact Form Message: " . $newMessage['subject'];
        $headers = "From: " . $newMessage['email'] . "\r\n";
        $headers .= "Reply-To: " . $newMessage['email'] . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $emailBody = "Name: " . $newMessage['name'] . "\n";
        $emailBody .= "Email: " . $newMessage['email'] . "\n";
        $emailBody .= "Interest: " . $newMessage['interest'] . "\n";
        $emailBody .= "Date: " . $newMessage['date'] . "\n\n";
        $emailBody .= "Message:\n" . $newMessage['message'] . "\n";

        // Attempt to send email (suppress errors as local env might not have mail server)
        @mail($to, $subject, $emailBody, $headers);

        echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save message']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>
