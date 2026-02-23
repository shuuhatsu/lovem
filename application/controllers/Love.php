<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Love extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('message_model', 'message_model');

        // Allow React frontend to access API
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
        header("Access-Control-Allow-Headers: Content-Type");
    }

    public function index() {
        $messages = $this->message_model->get_all_messages();
        echo json_encode($messages);
    }

    public function create() {
        if ($this->input->post()) {
            $this->message_model->insert_message([
                'sender' => $this->input->post('sender'),
                'receiver' => $this->input->post('receiver'),
                'message' => $this->input->post('message'),
            ]);
            echo json_encode(['status' => 'success']);
            return;
        }
    }

    public function delete($id) {
        $this->message_model->delete_message($id);
        echo json_encode(['status' => 'success']);
    }
}