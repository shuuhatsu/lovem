<h1>Love Messages 💌</h1>
<a href="<?= site_url('love/create') ?>">Create Message</a>
<hr>

<?php foreach($messages as $msg): ?>
    <p>
        <strong><?= $msg->sender ?></strong> to <strong><?= $msg->receiver ?></strong>: <?= $msg->message ?>
        <a href="<?= site_url('love/edit/'.$msg->id) ?>">Edit</a>
        <a href="<?= site_url('love/delete/'.$msg->id) ?>">Delete</a>
    </p>
<?php endforeach; ?>