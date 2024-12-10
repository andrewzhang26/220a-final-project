import numpy as np
import matplotlib.pyplot as plt
import IPython.display as ipd
from scipy.signal import get_window
from smstools.models import utilFunctions as UF
from smstools.models import sprModel as SPR
from smstools.models import stft as STFT
from scipy.io.wavfile import write

inputFile = 'fp/sounds/trombone-free-02.wav'
fs, x = UF.wavread(inputFile)
plt.figure(0, figsize=(10, 2))
time_indexes = np.linspace(0, x.size/fs, x.size)
plt.plot(time_indexes, x)
plt.xlabel('time (seconds)')
plt.ylabel('amplitude')
plt.show()
ipd.display(ipd.Audio(data=x, rate=fs))

window="hamming",
M=2001
N=2048
t=-80
minSineDur=0.02
maxnSines=150
freqDevOffset=10
freqDevSlope=0.001

Ns = 512
# hop size (has to be 1/4 of Ns)
H = 128

w = get_window(window, M)
hfreq, hmag, hphase, xr = SPR.sprModelAnal(x, fs, w, N, H, t, minSineDur, maxnSines, freqDevOffset, freqDevSlope)
mXr, pXr = STFT.stftAnal(xr, w, N, H)
y, yh = SPR.sprModelSynth(hfreq, hmag, hphase, xr, Ns, H, fs)

# export sound files
y_norm = np.int16(y / np.max(np.abs(y)) * 32767)
yh_norm = np.int16(yh / np.max(np.abs(yh)) * 32767)
xr_norm = np.int16(xr / np.max(np.abs(xr)) * 32767)

# Save output sound
output_file = 'output/spr_combined_output.wav'
write(output_file, fs, y_norm)

# Save harmonic component
harmonic_file = 'output/harmonic_sound.wav'
write(harmonic_file, fs, yh_norm)

# Save residual component
residual_file = 'output/residual_sound.wav'
write(residual_file, fs, xr_norm)

plt.figure(figsize=(10, 6))
maxplotfreq = 5000.0

# plot the magnitude spectrogram of residual
maxplotbin = int(N * maxplotfreq / fs)
numFrames = int(mXr[:, 0].size)
frmTime = H * np.arange(numFrames) / float(fs)
binFreq = np.arange(maxplotbin + 1) * float(fs) / N
plt.pcolormesh(frmTime, binFreq, np.transpose(mXr[:, : maxplotbin + 1]))
plt.autoscale(tight=True)
# plot harmonic frequencies on residual spectrogram
harms = hfreq * np.less(hfreq, maxplotfreq)
harms[harms == 0] = np.nan
numFrames = int(harms[:, 0].size)
frmTime = H * np.arange(numFrames) / float(fs)
plt.plot(frmTime, harms, color="k", ms=3, alpha=1)
plt.xlabel("time(s)")
plt.ylabel("frequency(Hz)")
plt.show()

# plot the output sound
plt.figure(0, figsize=(10, 2))
time_indexes = np.linspace(0, y.size/fs, y.size)
plt.plot(time_indexes, y)
plt.xlabel('time (seconds)')
plt.ylabel('amplitude')
plt.title("synthesized sound")
plt.show()
ipd.display(ipd.Audio(data=y, rate=fs))

# plot the harmonic component
plt.figure(0, figsize=(10, 2))
time_indexes = np.linspace(0, yh.size/fs, yh.size)
plt.plot(time_indexes, yh)
plt.xlabel('time (seconds)')
plt.ylabel('amplitude')
plt.title("harmonic component")
plt.show()
ipd.display(ipd.Audio(data=yh, rate=fs))

# plot the residual sound
plt.figure(0, figsize=(10, 2))
time_indexes = np.linspace(0, xr.size/fs, xr.size)
plt.plot(time_indexes, xr)
plt.xlabel('time (seconds)')
plt.ylabel('amplitude')
plt.title("residual component")
plt.show()
ipd.display(ipd.Audio(data=xr, rate=fs))
