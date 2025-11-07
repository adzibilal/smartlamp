import { useState } from "react";
import { Save, Bell, Database, Mail, Globe } from "lucide-react";

export function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notifikasi
    emailNotifications: true,
    pushNotifications: false,
    lampFailureAlert: true,
    dailyReport: false,

    // Sistem
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: "90",

    // Tampilan
    language: "id",
    timezone: "Asia/Jakarta",
    dateFormat: "DD/MM/YYYY",

    // Email
    smtpHost: "smtp.bandung.go.id",
    smtpPort: "587",
    smtpUser: "noreply@bandung.go.id",
  });

  const handleSave = () => {
    // Simulate save
    alert("Pengaturan berhasil disimpan!");
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Pengaturan</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Kelola pengaturan sistem monitoring PJU
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg transition font-medium"
        >
          <Save className="w-5 h-5" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Notifikasi */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Notifikasi
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Atur preferensi notifikasi sistem
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-zinc-900 dark:text-white">
                  Notifikasi Email
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Terima notifikasi melalui email
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-zinc-900 dark:text-white">
                  Push Notification
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Terima notifikasi push di browser
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pushNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-zinc-900 dark:text-white">
                  Alert Lampu Padam
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Notifikasi saat ada lampu yang padam
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.lampFailureAlert}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      lampFailureAlert: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-zinc-900 dark:text-white">Laporan Harian</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Terima laporan harian via email
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dailyReport}
                  onChange={(e) =>
                    setSettings({ ...settings, dailyReport: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Sistem */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
              <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Sistem</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Pengaturan sistem dan backup
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-zinc-900 dark:text-white">Auto Backup</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Backup otomatis database
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) =>
                    setSettings({ ...settings, autoBackup: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                Frekuensi Backup
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) =>
                  setSettings({ ...settings, backupFrequency: e.target.value })
                }
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="hourly">Setiap Jam</option>
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                Retensi Data (hari)
              </label>
              <input
                type="number"
                value={settings.dataRetention}
                onChange={(e) =>
                  setSettings({ ...settings, dataRetention: e.target.value })
                }
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tampilan */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
              <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Tampilan</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Pengaturan bahasa dan format
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                Bahasa
              </label>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({ ...settings, language: e.target.value })
                }
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                Zona Waktu
              </label>
              <select
                value={settings.timezone}
                onChange={(e) =>
                  setSettings({ ...settings, timezone: e.target.value })
                }
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="Asia/Jakarta">WIB (Jakarta)</option>
                <option value="Asia/Makassar">WITA (Makassar)</option>
                <option value="Asia/Jayapura">WIT (Jayapura)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                Format Tanggal
              </label>
              <select
                value={settings.dateFormat}
                onChange={(e) =>
                  setSettings({ ...settings, dateFormat: e.target.value })
                }
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Email Configuration */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
              <Mail className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Konfigurasi Email
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Pengaturan SMTP untuk notifikasi email
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                SMTP Host
              </label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) =>
                  setSettings({ ...settings, smtpHost: e.target.value })
                }
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                  SMTP Port
                </label>
                <input
                  type="text"
                  value={settings.smtpPort}
                  onChange={(e) =>
                    setSettings({ ...settings, smtpPort: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                  SMTP User
                </label>
                <input
                  type="text"
                  value={settings.smtpUser}
                  onChange={(e) =>
                    setSettings({ ...settings, smtpUser: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

