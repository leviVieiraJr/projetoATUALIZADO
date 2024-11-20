app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(404).json({ message: "E-mail não encontrado!" });
    }

    const usuario = results[0];
    const token = jwt.sign(
      { userId: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const link = `http://localhost:4200/reset-password?token=${token}`;
    console.log(`Link de recuperação de senha enviado para ${email}: ${link}`);
    res.json({ message: `Link de recuperação enviado para ${email}`, link });
  });
});
