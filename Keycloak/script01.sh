kubectl delete namespace keycloak && \
kubectl create namespace keycloak && \
helm install euc . -n keycloak && \
cd /etc/kubernetes/EUC/Cert/ && \
kubectl create secret tls keycloak-tls --cert=tls.crt --key=tls.key -n keycloak && \
kubectl get all -n keycloak && \
cd /etc/kubernetes/EUC/Keycloak
