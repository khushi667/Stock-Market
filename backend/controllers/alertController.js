let alerts = [];

export const getAllAlerts = (req, res) => {
    res.json(alerts);
};

export const addAlert = (req, res) => {
    const newAlert = { ...req.body, id: alerts.length + 1, status: 'Pending' };
    alerts.push(newAlert);
    res.status(201).json(newAlert);
};

export const deleteAlert = (req, res) => {
    const { id } = req.params;
    alerts = alerts.filter(alert => alert.id !== parseInt(id, 10));
    res.json({ message: 'Alert deleted' });
};

export const clearAlerts = (req, res) => {
    alerts = [];
    res.json({ message: 'All alerts cleared' });
};
