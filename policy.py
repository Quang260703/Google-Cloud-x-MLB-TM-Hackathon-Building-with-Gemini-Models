import numpy as np
from collections import defaultdict

from scipy.special import logsumexp
from scipy.special import expit

# Q_Omega is the meta policy informing the intra-options policy Q_U
class EpsGreedyPolicy():

	def __init__(self, rng, nstates, noptions, epsilon):
		self.rng = rng
		self.nstates = nstates
		self.noptions = noptions
		self.epsilon = epsilon
		self.Q_Omega_table = defaultdict()

	def Q_Omega(self, state, option=None):
		if state not in self.Q_Omega_table:
			self.Q_Omega_table[state] = np.zeros(self.noptions)
		if option is None:
			return self.Q_Omega_table[state]
		else:
			return self.Q_Omega_table[state][option]

	def sample(self, state):
		if self.rng.uniform() < self.epsilon:
			return int(self.rng.randint(self.noptions))
		else:
			return int(np.argmax(self.Q_Omega(state)))