<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class message_model extends CI_Model {  // lowercase class name

    public function __construct() {
        parent::__construct();
        $this->load->database(); // load DB
    }

    public function get_all_messages() {
        return $this->db->get('messages')->result();
    }

    public function insert_message($data) {
        return $this->db->insert('messages', $data);
    }

    public function get_message($id) {
        return $this->db->get_where('messages', ['id' => $id])->row();
    }

    public function update_message($id, $data) {
        $this->db->where('id', $id);
        return $this->db->update('messages', $data);
    }

    public function delete_message($id) {
        $this->db->where('id', $id);
        return $this->db->delete('messages');
    }
}