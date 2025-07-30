kubectl delete namespace keycloak && \
kubectl create namespace keycloak && \
helm install euc . -n keycloak && \
cd /etc/kubernetes/EUC/Cert/ && \
kubectl create secret tls keycloak-tls --cert=fullchain.pem --key=privkey.pem -n keycloak && \
kubectl get all -n keycloak && \
cd /etc/kubernetes/EUC/Keycloak
