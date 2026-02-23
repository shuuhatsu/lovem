<h1>Edit Love Message ✍️</h1>
<form method="post">
    Sender: <input type="text" name="sender" value="<?= $message->sender ?>"><br>
    Receiver: <input type="text" name="receiver" value="<?= $message->receiver ?>"><br>
    Message: <textarea name="message"><?= $message->message ?></textarea><br>
    <button type="submit">Update</button>
</form>
<a href="<?= site_url('love') ?>">Back</a>