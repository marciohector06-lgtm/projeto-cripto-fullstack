const authMiddleware = (req, res, next) => {
  const key = req.headers['x-api-key']; // O app vai enviar a chave aqui

  if (key && key === process.env.API_KEY_SECRET) {
    next(); // Chave correta! Pode passar para a rota.
  } else {
    console.warn(`[-] Tentativa de acesso negada! IP: ${req.ip}`);
    res.status(401).json({ sucesso: false, mensagem: "Acesso negado: Chave inválida!" });
  }
};

module.exports = authMiddleware;